import { Resource } from 'sst';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Util } from './../../core/src/util/index';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
export const main = Util.handler(async (event) => {
  const params = {
    TableName: Resource.Notes.name,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: event?.pathParameters?.id,
    },
  };
  await dynamoDb.send(new DeleteCommand(params));
  return JSON.stringify({ status: true });
});
