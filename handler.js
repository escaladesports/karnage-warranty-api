'use strict';

const api = require('./src/api.js');

module.exports.postWarrantyRegistration = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const params = {
    bowModel: body['karnage-warranty-model'],
    bowSerialNumber: body['karnage-warranty-serial-number'],
    userFirstName: body['karnage-warranty-customer-first-name'],
    userLastName: body['karnage-warranty-customer-last-name'],
    userAddress: body['karnage-warranty-customer-mailing-address'],
    userCity: body['karnage-warranty-customer-city'],
    userState: body['karnage-warranty-customer-state'],
    userZip: body['karnage-warranty-customer-zip'],
    userCountry: body['karnage-warranty-customer-country'],
    userPhone: body['karnage-warranty-customer-phone'],
    userEmail: body['karnage-warranty-customer-email'],
    receivedGift: body['karnage-warranty-received-gift'],
    dealerName: body['karnage-warranty-dealer-name'],
    dealerAddress: body['karnage-warranty-dealer-address'],
    dealerCity: body['karnage-warranty-dealer-city'],
    dealerState: body['karnage-warranty-dealer-state'],
    dealerZip: body['karnage-warranty-dealer-zip'],
    dealerCountry: body['karnage-warranty-dealer-country']
  };

  api.postWarrantyRegistration(params).then(responseData => {
    const body = JSON.stringify(responseData);
    const response = {
      statusCode: 200,
      body,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": 'true'
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