const request = require('request-promise-native');
const queryValidator = require('./query-validator.js');
const store = require('./store.js');
const range = require('./range.js');
const email = require('./email.js');
const emailConfig = require('../config/email.config.js');

function postWarrantyRegistrationActions(data) {
	// post google sheets request
	// order is important, do this first so we can pass claim # to email properly
	return store.saveWarrantyRegistration(data)
	.then(res => {
		// add in additional information from google sheets
		const requestId = range.getFinalRangeRow(res.updates.updatedRange);
		const updatedData = Object.assign({}, data, { requestId });
		// email relevant parties
		//return email.sendWarrantyRegistrationEmail(updatedData, emailConfig.warrantyRegistrationRecipients)
		return updatedData; // emailing disabled, just sent the raw data...
	});
}

/**
* Use to make a request to the warranty registration API (if passed valid data)
* @param {Object} data Request data
* @param {String} data.bowModel Name of product model
* @param {Number|String} data.bowSerialNumber Product serial number
* @param {String} data.userFirstName User's first name
* @param {String} data.userLastName User's last name
* @param {String} data.userAddress User's home address
* @param {String} data.userCity User's city of residence
* @param {String} data.userState User's state of residence
* @param {Number|String} data.userZip User's zip/postal code
* @param {String} data.userCountry User's country of residence
* @param {Number|String} data.userPhone User's phone number
* @param {String} data.userEmail User's email address
* @param {Boolean} data.receivedGift Indicates whether user received product as a gift
* @param {String} data.dealerName Name of the dealer/store where product was purchased
* @param {String} data.dealerAddress Dealer's address
* @param {String} data.dealerCity Dealer's city
* @param {String} data.dealerState Dealer's state
* @param {Number|String} data.dealerZip Dealer's zip/postal code
* @param {String} data.dealerCountry Dealer's country
* @returns {Promise.<Object>} Returns a promise resolving to a JSON response from the API (or an error
* if passed invalid data)
* @example
*	api.postWarrantyRegistration({
		bowModel: 'Apocalypse',
		bowSerialNumber: 87480684,
		userFirstName: 'John',
		userLastName: 'Doe',
		userAddress: '817 Maxwell Ave',
		userCity: 'Evansville',
		userState: 'Indiana',
		userZip: 47711,
		userCountry: 'United States',
		userPhone: '812-555-6789',
		userEmail: 'johndoe@gmail.com',
		receivedGift: false,
		dealerName: 'Dick\'s Sporting Goods',
		dealerAddress: '6601 E. Lloyd Expressway',
		dealerCity: 'Evansville',
		dealerState: 'Indiana',
		dealerZip: 47715,
		dealerCountry: 'United States'
	
	}).then( ... )
*/
module.exports.postWarrantyRegistration = function(data) {
	// validate
	if (!queryValidator.validateWarrantyRegistrationPost(data)) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return postWarrantyRegistrationActions(data);
}