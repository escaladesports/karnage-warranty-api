'use strict';

const dealerApi = require('./src/dealer-api.js');

module.exports.endpoint = (event, context, callback) => {
  const params = {
    brand: event.pathParameters.brand,
    business: event.pathParameters.business
  };

  cpsiaApi.cpsiaRequest(params).then(cpsiaData => {
    const response = {
      statusCode: 200,
      body: cpsiaData,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    };
    callback(null, response);
  }).catch(err => {
    let msg = 'There was a problem with your request. Please try again later';
    
    if (err.code === 'malformed') {
      msg = 'The request data was malformed- ensure parameter data is correct and try again.'
    }

    const response = {
      statusCode: 400,
      body: JSON.stringify({
        errors: [msg]
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    };
    callback(null, response);
  });
};