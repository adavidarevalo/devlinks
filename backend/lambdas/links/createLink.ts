import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import * as _ from 'lodash';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { parse } from 'lambda-multipart-parser'; // Import lambda-multipart-parser

AWSXRay.captureAWS(require('aws-sdk'));

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = _.get(event, "requestContext.authorizer.claims.sub");

    // Parse the multipart form data using lambda-multipart-parser
    const formData = await parse(event);

    let avatarFile: any = null;

    // Collect form data
    const { firstName = '', lastName = '', files } = formData;

    // Look for the avatar file in the files array
    const avatar = files.find(file => file.fieldname === 'avatar');
    
    // Validate the avatar file type
    if (avatar && avatar.contentType?.startsWith('image/')) {
      avatarFile = avatar;
    } else if (avatar) {
      throw new Error('Invalid file type, only images are allowed');
    }

    // Check if the item already exists in DynamoDB
    const existingItem = await dynamodb
      .get({
        TableName: process.env.DYNAMO_TABLE_NAME!,
        Key: { userId },
      })
      .promise();

    let avatarUrl = existingItem.Item ? existingItem.Item.avatar : '';
    const bucketName = process.env.S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error('S3 bucket name is not set in environment variables.');
    }

    if (avatarFile) {
      const s3Key = `${userId}/${nanoid()}${extname(avatarFile.filename)}`;

      // Delete existing avatar if present
      if (existingItem.Item && existingItem.Item.avatar) {
        const oldAvatarKey = existingItem.Item.avatar.split('.com/')[1];
        await s3
          .deleteObject({
            Bucket: bucketName, // Use the bucket name here
            Key: oldAvatarKey,
          })
          .promise();
      }

      // // Upload new avatar - Ensure the content is uploaded as a Buffer
      // const uploadResult = await s3
      //   .upload({
      //     Bucket: bucketName,
      //     Key: s3Key,
      //     Body: Buffer.from(avatarFile.content),  // Convert content to Buffer
      //     ContentType: avatarFile.contentType,    // Set content type (e.g., image/jpeg)
      //   })
      //   .promise();
      // const base64Data = avatarFile.content.replace(/^data:image\/\w+;base64,/, "");
      // const buffer = Buffer.from(base64Data, 'base64');
console.log("X1 ", avatarFile.content)

 const uploadResult = await s3.upload({
        Bucket: bucketName,
        Key: s3Key,
        Body: avatarFile.content,  // Use the Buffer directly
        ContentType: avatarFile.contentType,    // Set content type (e.g., image/jpeg)
      }).promise();


      avatarUrl = uploadResult.Location;
    }

    const item = {
      userId,
      avatar: avatarUrl,
      firstName,
      lastName,
      id: existingItem.Item ? existingItem.Item.id : nanoid(),
    };

    if (!existingItem.Item) {
      // Item does not exist, create a new one
      await dynamodb
        .put({
          TableName: process.env.DYNAMO_TABLE_NAME!,
          Item: item,
        })
        .promise();

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'User links created successfully', item }),
      };
    } else {
      // Item exists, update the existing item
      await dynamodb
        .update({
          TableName: process.env.DYNAMO_TABLE_NAME!,
          Key: { userId },
          UpdateExpression:
            'set avatar = :avatar, firstName = :firstName, lastName = :lastName',
          ExpressionAttributeValues: {
            ':avatar': avatarUrl || '',
            ':firstName': firstName,
            ':lastName': lastName,
          },
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User links updated successfully', item }),
      };
    }
  } catch (error: any) {
    console.error(error);
    if (error.code === 'NotAuthorizedException') {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid or expired token' }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating or updating user links', error: error.message }),
    };
  }
};
