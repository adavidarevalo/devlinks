import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

AWSXRay.captureAWS(require('aws-sdk'));

const cognito = new AWS.CognitoIdentityServiceProvider();

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { email, username, password } = JSON.parse(event.body || '{}');

  const createUserParams = {
    UserPoolId: process.env.USER_POOL_ID!,
    Username: username,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'preferred_username', Value: username }
    ],
    MessageAction: 'SUPPRESS'
  };

  try {
    await cognito.adminCreateUser(createUserParams).promise();

    // Step 2: Set a permanent password for the user
    const setPasswordParams = {
      UserPoolId: process.env.USER_POOL_ID!,
      Username: username,
      Password: password,
      Permanent: true
    };

    await cognito.adminSetUserPassword(setPasswordParams).promise();

    // Step 3: Trigger email verification manually
    const adminUpdateUserAttributesParams = {
      UserPoolId: process.env.USER_POOL_ID!,
      Username: username,
      UserAttributes: [
        { Name: 'email_verified', Value: 'true' } // Mark email as verified
      ]
    };

    await cognito.adminUpdateUserAttributes(adminUpdateUserAttributesParams).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Or specific origins
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET", // Or the methods you support
      },
      body: JSON.stringify({ message: 'User registered successfully and email verified.' })
    };
  } catch (error: any) {
    console.error("Error processing user registration:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
