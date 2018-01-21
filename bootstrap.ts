import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as https from 'https';

const S3 = new AWS.S3();

const genScript: Handler = (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  let version = event.queryStringParameters
    ? event.queryStringParameters.v || 'current'
    : 'current';
  S3.getObject(
    {
      Bucket: 'mikeworks-libs',
      Key: `techcheck/${version}/bootstrap.sh`
    },
    (err, data) => {
      //
      if (!data) {
        cb(null, {
          statusCode: 200,
          body: `/** There is a problem with the script generation service. Please try again later **/


console.log('⚠️ There is a problem with the script generation service. Please try again later ⚠️');
`
        });
        return;
      }

      const response = {
        statusCode: 200,
        body: data.Body.toString().replace(
          'https://mikeworks-libs.s3.amazonaws.com/techcheck/index.js',
          `https://f2co98an90.execute-api.us-west-2.amazonaws.com/dev/preflight/script?v=${version}`
        )
      };
      cb(null, response);
    }
  );
};
export default genScript;
