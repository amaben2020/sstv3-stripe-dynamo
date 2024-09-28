import { table } from './storage';

// Create the API
export const api = new sst.aws.ApiGatewayV2('Api', {
  transform: {
    route: {
      handler: {
        // link our dynamodb to the handler to allow our api access table
        link: [table],
      },
    },
  },
});

api.route('POST /notes', 'packages/functions/src/create.main');
