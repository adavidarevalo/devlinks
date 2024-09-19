import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import * as _ from 'lodash';
import { nanoid } from 'nanoid'

AWSXRay.captureAWS(require('aws-sdk'));

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    
    const userId = _.get(event, "requestContext.authorizer.claims.sub");
    
    const { avatar= "", firstName = "", lastName = "", links = [] } = JSON.parse(event.body || '{}');


    const item = {
      userId, // Use userId from Cognito as the partition key
      avatar: avatar,
      firstName,
      lastName,
      links: links.map((link: { platform: string; url: string }) => ({
        platform: link.platform,
        url: link.url,
      })),
      id: nanoid()
    };

    // Check if the item already exists in DynamoDB
    const existingItem = await dynamodb
      .get({
        TableName: process.env.DYNAMO_TABLE_NAME!,
        Key: { userId },
      })
      .promise();

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
            'set avatar = :avatar, firstName = :firstName, lastName = :lastName, links = :links',
          ExpressionAttributeValues: {
            ':avatar': avatar || '',
            ':firstName': firstName,
            ':lastName': lastName,
            ':links': links.map((link: { platform: string; url: string }) => ({
              platform: link.platform,
              url: link.url,
            })),
          },
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User links updated successfully', item }),
      };
    }
  } catch (error: any) {
    console.error(error)
    if (error.code === 'NotAuthorizedException') {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid or expired token' }),
      };
    }

    // Log and return a 500 error if something else went wrong
    console.error('Error creating or updating user links:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating or updating user links', error: error.message }),
    };
  }
};
