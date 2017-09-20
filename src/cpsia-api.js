const request = require('request-promise-native');

function cpsiaRequest(brand, business) {
	const endpoint = `https://apis.escaladesports.com/v1/cpsia/get/${brand}/${business}`;
	return request(endpoint);
}



/**
* Use to make a request to the Escalade CPSIA Certificate API (if passed valid data)
* @param {Object} data Request data
* @param {String} data.brand Brand name to retrieve CPSIA certificates for
* @param {Number} data.business Business ('sports' or 'archery') to retrieve CPSIA certificates for
* @returns {Promise.<Object>} Returns a promise resolving to a JSON response from the API (or an error
* if passed invalid data)
* @example
* cpsiaApi.cpsiaRequest('bear', 'archery').then( ... )
*/
module.exports.cpsiaRequest = function(data) {
	// validate
	if (!data.brand || !data.business) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return cpsiaRequest(data.brand, data.business);
}