import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import * as _ from 'lodash';

AWSXRay.captureAWS(require('aws-sdk'));

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const queryStringParameters = event.queryStringParameters || {};
    const userId = queryStringParameters?.userId || '';
    const id = queryStringParameters?.id || '';

    // Determine the key to use for DynamoDB query
    const key = userId ? { userId } : { id };

    // Get the item from DynamoDB
    const result = await dynamodb
      .get({
        TableName: process.env.DYNAMO_TABLE_NAME!,
        Key: key,
      })
      .promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving item', error: error.message }),
    };
  }
};
