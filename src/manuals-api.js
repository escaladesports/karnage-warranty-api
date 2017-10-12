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
	const fileData = parsed.files;
	const formattedData = {
		manuals: []
	};

	// response is formatted as
	// { 
	//		files: {
	//			'fileDirName': {  // ex '/var/www/html/manual-files/goalrilla/accessories'
	//				'fileTitle': 'file_name.pdf'  // ex 'B2412' : 'B2412_2L679801'
	//			}
	// 		}
	// }
	for (let dir in fileData) {
		const files = fileData[dir];
		for (let fileName in files) {
			const file = files[fileName];
			const formattedFile = {
				file,
				name: fileName,
				dir: dir
			}
			formattedData.manuals.push(formattedFile);
		}
	}
	return formattedData;
}



/**
* Use to make a request to the Escalade manuals API (if passed valid data)
* @param {Object} data Request data
* @param {String} data.brand Brand name to retrieve manuals for
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