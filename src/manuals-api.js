const request = require('request-promise-native');
const typeValidator = require('./typeValidator.js');

function manualsRequest(brand) {
	const endpoint = `https://apis.escaladesports.com/v1/manuals/get/${brand}`;
	return request(endpoint);
}

/**
* Formats raw responses from the Escalade manuals API into a more easily consumable form
* @param {Object} responseData API response data
* @param {Object.<Object>} responseData.files Object containing various arrays of manual file names
* @returns {Object} Returns an object containing formatted response data
*/
function formatManualsResponse(responseData) {
	const parsed = typeValidator.isString(responseData) ? JSON.parse(responseData) : responseData;
	const fileData = parsed.data.files;
	const formattedData = {
		certificates: []
	};
	// Escalade API gives files as an object with directory names as keys and an array of
	// file names under that directory as values, but we want to flatten this structure out
	// into a single array of file info objects
	for (let dir in fileData) {
		const files = fileData[dir];
		const formattedFiles = files.map(file => ({
			file,
			name: file.replace(/\.[^/.]+$/, ""),
			directory: dir
		}));
		formattedData.certificates.push(...formattedFiles);
	}
	return formattedData;
}



/**
* Use to make a request to the Escalade manuals API (if passed valid data)
* @param {Object} data Request data
* @param {String} data.brand Brand name to retrieve manuals certificates for
* @returns {Promise.<Object>} Returns a promise resolving to a JSON response from the API (or an error
* if passed invalid data)
* @example
* manualsApi.manualsRequest({brand: 'goalrilla'}).then( ... )
*/
module.exports.manualsRequest = function(data) {
	// validate
	if (!data.brand) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return manualsRequest(data.brand).then(responseData => formatManualsResponse(responseData));
}