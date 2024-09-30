import { bucket, secret, table } from './storage';

export const api = new sst.aws.ApiGatewayV2('Api', {
  cors: {
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  transform: {
    route: {
      handler: {
        link: [table, bucket, secret],
      },
    },
  },
});
api.route('POST /notes', 'packages/functions/src/create.main');
api.route('GET /notes', 'packages/functions/src/list.main');
api.route('PUT /notes', 'packages/functions/src/update.main');
api.route('DELETE  /notes/{id}', 'packages/functions/src/delete.main');
api.route('GET notes/{id}', 'packages/functions/src/get.ts');
api.route('POST /billing', 'packages/functions/src/billing.ts');
