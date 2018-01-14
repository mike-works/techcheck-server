import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as https from 'https';

const S3 = new AWS.S3();

const genScript: Handler = (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  let version = event.queryStringParameters.v || 'current';
  S3.getObject(
    {
      Bucket: 'mikeworks-libs',
      Key: `techcheck/${version}/index.js`
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
      // let cfg = `global.TechCheckConfig`
      let cfg = {
        verify: [
          { name: 'openssl', version: /2.2.7/ },
          { name: 'node', version: { semver: '^9.2.0' } },
          { name: 'postgres', version: { semver: { min: '9.0.0' } } }
        ]
      };
      const response = {
        statusCode: 200,
        body: `global.TechCheckConfig = ${JSON.stringify(cfg)}



${data.Body.toString()}`
      };
      cb(null, response);
    }
  );
};
export default genScript;
