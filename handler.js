'use strict';

const manualsApi = require('./src/manuals-api.js');

module.exports.postQuoteRequest = (event, context, callback) => {
  const params = {
    dealerId: event.body.dealerId,
    dealerName: event.body.dealerName,
    dealerAddress: event.body.dealerAddress,
    dealerCity: event.body.dealerCity,
    dealerZip: event.body.dealerZip,
    dealerPhone: event.body.dealerPhone,
    userFirstName: event.body.userFirstName,
    userLastName: event.body.userLastName,
    userEmail: event.body.userEmail,
    userPhone: event.body.userPhone,
    contactPreference: event.body.contactPreference,
    userState: event.body.userState,
    userZip: event.body.userZip
  };

  console.log('endpoint called, event:');
  console.dir(event.body);

  manualsApi.manualsRequest(params).then(manualsData => {
    const body = JSON.stringify(manualsData);
    const response = {
      statusCode: 200,
      body,
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