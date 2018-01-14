import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as https from 'https';

const S3 = new AWS.S3();

const genScript: Handler = (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  S3.getObject(
    {
      Bucket: 'mikeworks-libs',
      Key: 'techcheck/current/index.js'
    },
    (err, data) => {
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
        body: data.Body.toString()
      };
      cb(null, response);
    }
  );
};
export default genScript;
