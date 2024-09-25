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

    const key = { userId }; // Changed to always use userId

    // Get the item from DynamoDB
    const result = await dynamodb
      .get({
        TableName: process.env.DYNAMO_TABLE_NAME!,
        Key: key,
      })
      .promise();

    if (!result.Item) {
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
      body: JSON.stringify(result.Item),
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
