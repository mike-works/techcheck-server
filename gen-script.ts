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
      Key: 'techcheck/index.js'
    },
    (err, data) => {
      const response = {
        statusCode: 200,
        body: data.Body.toString()
      };
      cb(null, response);
    }
  );
};
export default genScript;
