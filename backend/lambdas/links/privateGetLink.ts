import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import * as _ from "lodash";

AWSXRay.captureAWS(require("aws-sdk"));

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = _.get(event, "requestContext.authorizer.claims.sub");

    const result = await dynamodb
    .query({
      TableName: process.env.DYNAMO_TABLE_NAME!,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    })
    .promise();

    if (!result.Items) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          firstName: "",
          lastName: "",
          email: "",
          avatar: null,
          links: [],
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items[0]),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving item",
        error: error.message,
      }),
    };
  }
};
