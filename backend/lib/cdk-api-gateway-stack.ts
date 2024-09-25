import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import * as certificates from "aws-cdk-lib/aws-certificatemanager";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as s3 from "aws-cdk-lib/aws-s3";

export class CdkApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = process.env.AWS_DOMAIN_NAME as string;
    const hostedZone = this.createHostedZone(domainName);
    const certificate = this.createCertificate(domainName, hostedZone);
    const customDomain = this.createApiGatewayDomain(domainName, certificate);
    this.createApiGatewayAliasRecord(customDomain, hostedZone);
    const userPool = this.createCognitoUserPool();
    const userPoolClient = this.createCognitoUserPoolClient(userPool);
    
    const registerLambda = this.createLambdaFunction("RegisterFunction", "./lambdas/auth/register.ts", {
      USER_POOL_ID: userPool.userPoolId,
      CLIENT_ID: userPoolClient.userPoolClientId,
    });

    const loginLambda = this.createLambdaFunction("LoginFunction", "./lambdas/auth/login.ts", {
      CLIENT_ID: userPoolClient.userPoolClientId,
    });

    this.grantCognitoPermissions(registerLambda, userPool);
    this.grantCognitoPermissions(loginLambda, userPool, ["cognito-idp:InitiateAuth"]);

    const api = this.createApiGateway();

    const requestValidator = this.createRequestValidator(api);
    const registerRequestModel = this.createRequestModel(api, "RegisterRequestModel", {
      email: { type: apigateway.JsonSchemaType.STRING },
      username: { type: apigateway.JsonSchemaType.STRING },
      password: { type: apigateway.JsonSchemaType.STRING },
    });

    const loginRequestModel = this.createRequestModel(api, "LoginRequestModel", {
      username: { type: apigateway.JsonSchemaType.STRING },
      password: { type: apigateway.JsonSchemaType.STRING },
    });

    this.createApiMethods(api, registerLambda, loginLambda, requestValidator, registerRequestModel, loginRequestModel);

    const devlinksTable = this.createDynamoDBTable();
    const s3Bucket = this.createS3Bucket();

    const createLinkLambda = this.createLambdaFunction("CreateLinkFunction", "./lambdas/links/createLink.ts", {
      USER_POOL_ID: userPool.userPoolId,
      DYNAMO_TABLE_NAME: devlinksTable.tableName,
      S3_BUCKET_NAME: s3Bucket.bucketName,
    });

    this.grantTableAndBucketPermissions(createLinkLambda, devlinksTable, s3Bucket);

    const getLinkLambda = this.createLambdaFunction("GetLinkFunction", "./lambdas/links/getLink.ts", {
      DYNAMO_TABLE_NAME: devlinksTable.tableName,
    });

    this.grantTablePermissions(getLinkLambda, devlinksTable);
    
    const linkResource = api.root.addResource("link");
    this.addCorsToResource(linkResource);
    this.addLinkResourceMethods(linkResource, createLinkLambda, getLinkLambda, userPool);

    const privateGetLinkLambda = this.createLambdaFunction("PrivateGetLinkFunction", "./lambdas/links/privateGetLink.ts", {
      DYNAMO_TABLE_NAME: devlinksTable.tableName,
    });
    
    this.grantTablePermissions(privateGetLinkLambda, devlinksTable);
    
    const privateGetLinkResource = api.root.addResource("privateLink");
    this.addCorsToResource(privateGetLinkResource);
    privateGetLinkResource.addMethod("GET", new apigateway.LambdaIntegration(privateGetLinkLambda),  {                                                                                                                        
      authorizationType: apigateway.AuthorizationType.COGNITO,                                                               
      authorizer: new apigateway.CognitoUserPoolsAuthorizer(                                                                 
        this,                                                                                                                
        "PrivateCognitoAuthorizer",                                                                                          
        {                                                                                                                    
          cognitoUserPools: [userPool],                                                                                      
        }                                                                                                                    
      ),                                                                                                                     
    } );

    // Custom domain mapping
    new apigateway.BasePathMapping(this, "BasePathMapping", {
      domainName: customDomain,
      restApi: api,
      stage: api.deploymentStage,
    });
  }

  private createHostedZone(domainName: string) {
    return route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName,
    });
  }

  private createCertificate(domainName: string, hostedZone: route53.IHostedZone) {
    return new certificates.Certificate(this, "AppCertificate", {
      domainName,
      subjectAlternativeNames: [`*.${domainName}`], // Wildcard SAN
      validation: certificates.CertificateValidation.fromDns(hostedZone), // Use Route 53 for DNS validation
    });
  }

  private createApiGatewayDomain(domainName: string, certificate: certificates.ICertificate) {
    return new apigateway.DomainName(this, "CustomDomain", {
      domainName: `backend.${domainName}`,
      certificate,
    });
  }

  private createApiGatewayAliasRecord(customDomain: apigateway.IDomainName, hostedZone: route53.IHostedZone) {
    new route53.ARecord(this, "ApiAliasRecord", {
      recordName: "backend",
      target: route53.RecordTarget.fromAlias(new route53Targets.ApiGatewayDomain(customDomain)),
      zone: hostedZone,
      ttl: cdk.Duration.minutes(1), // TTL for the DNS record
    });
  }

  private createCognitoUserPool() {
    return new cognito.UserPool(this, "UserPool", {
      signInAliases: {
        email: true,
        username: true,
      },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Only for dev/test environments
    });
  }

  private createCognitoUserPoolClient(userPool: cognito.IUserPool) {
    return new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      authFlows: {
        userPassword: true,
        adminUserPassword: true,
      },
      generateSecret: false,
    });
  }

  private createLambdaFunction(functionName: string, entry: string, environment: { [key: string]: string }) {
    return new lambdaNodejs.NodejsFunction(this, functionName, {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry,
      functionName,
      handler: "handler",
      memorySize: 400, // Increase memory if needed
      timeout: cdk.Duration.seconds(120), // Increase timeout if needed
      bundling: {
        minify: true,
        sourceMap: false,
      },
      environment,
      tracing: lambda.Tracing.ACTIVE,
      insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_119_0,
    });
  }

  private grantCognitoPermissions(lambdaFunction: lambda.IFunction, userPool: cognito.IUserPool, additionalActions: string[] = []) {
    const actions = [
      "cognito-idp:AdminCreateUser",
      "cognito-idp:AdminSetUserPassword",
      "cognito-idp:AdminUpdateUserAttributes",
      ...additionalActions,
    ];

    const policy = new iam.PolicyStatement({
      actions,
      resources: [userPool.userPoolArn],
    });

    lambdaFunction.addToRolePolicy(policy);
  }

  private createApiGateway() {
    return new apigateway.RestApi(this, "Api", {
      restApiName: "User Service",
      description: "This service handles user registration and login.",
    });
  }

  private createRequestValidator(api: apigateway.IRestApi) {
    return new apigateway.RequestValidator(this, "RequestValidator", {
      restApi: api,
      validateRequestBody: true,
      validateRequestParameters: false,
    });
  }

  private createRequestModel(api: apigateway.IRestApi, modelName: string, properties: { [key: string]: any }) {
    return new apigateway.Model(this, modelName, {
      modelName,
      restApi: api,
      schema: {
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          ...properties,
        },
        required: Object.keys(properties),
      },
    });
  }

  private createApiMethods(api: apigateway.IRestApi, registerLambda: lambda.IFunction, loginLambda: lambda.IFunction, 
                            requestValidator: apigateway.IRequestValidator, registerRequestModel: apigateway.IModel, 
                            loginRequestModel: apigateway.IModel) {
    const loginResource = api.root.addResource("login");
    this.addCorsToResource(loginResource);
    loginResource.addMethod("POST", new apigateway.LambdaIntegration(loginLambda), {
      requestValidator,
      requestModels: { "application/json": loginRequestModel },
    });

    const registerResource = api.root.addResource("register");
    this.addCorsToResource(registerResource);
    registerResource.addMethod("POST", new apigateway.LambdaIntegration(registerLambda), {
      requestValidator,
      requestModels: { "application/json": registerRequestModel },
    });
  }

  private addCorsToResource(resource: apigateway.IResource) {
    resource.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
    });
  }

  private createDynamoDBTable() {
    return new dynamodb.Table(this, "DevLinksTable", {
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }

  private createS3Bucket() {
    return new s3.Bucket(this, "DevLinksBucket", {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true, // Only for dev/test environments
    });
  }

  private grantTableAndBucketPermissions(lambdaFunction: lambda.IFunction, table: dynamodb.ITable, bucket: s3.IBucket) {
    table.grantReadWriteData(lambdaFunction);
    bucket.grantReadWrite(lambdaFunction);
  }

  private grantTablePermissions(lambdaFunction: lambda.IFunction, table: dynamodb.ITable) {
    table.grantReadData(lambdaFunction);
  }

  private addLinkResourceMethods(resource: apigateway.IResource, createLinkLambda: lambda.IFunction, getLinkLambda: lambda.IFunction, userPool: cognito.IUserPool) {
    resource.addMethod("POST", new apigateway.LambdaIntegration(createLinkLambda), {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer: new apigateway.CognitoUserPoolsAuthorizer(this, "CognitoAuthorizer", {
        cognitoUserPools: [userPool],
      }),
    });

    resource.addMethod("GET", new apigateway.LambdaIntegration(getLinkLambda));
  }
}
