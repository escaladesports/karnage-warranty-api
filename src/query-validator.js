/*
	Checks for missing keys in request data
	@param {Array.<String>} keys Keys/properties to check for on request data
	@param {Object} data Request data to validate
	@returns {Boolean} False if validation fails, true if successful
*/
function checkMissingKeys(keys, data) {
	for (let key of keys) {
		if (!data[key]) {
			console.log('missing key '+key);
			return false;
		}
	}
	return true;
}

function validateQuotePost(params) {
	// check for missing data
	if (!checkMissingKeys([
			'dealerId',
			'dealerName',
			'dealerAddress',
			'dealerCity',
			'dealerState',
			'dealerZip',
			'dealerPhone',
			'userFirstName',
			'userLastName',
			'userEmail',
			'userPhone',
			'contactPreference',
			'userState',
			'userZip'
		], params)) {
		return false;
	}
	return true;
}

module.exports = {
	validateQuotePost
}