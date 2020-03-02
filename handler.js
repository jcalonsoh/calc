const serverless = require('serverless-http');
const { getServer } = require('./index');

let endpoint;

module.exports.endpoint = async (event, context) => {
  if (!endpoint) {
    const app = await getServer();
    endpoint = serverless(app, {
      request: (request) => {
        request.serverless = { event, context }
      }
    })
  }

  const res = await endpoint(event, context);
  return res;

  //const response = {
    //statusCode: 200,
    //body: JSON.stringify({
      //message: `Hello, the current time is ${new Date().toTimeString()}.`,
    //}),
  //};
  //return response
};