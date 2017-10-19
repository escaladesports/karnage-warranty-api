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
	console.log('validating data:');
	console.dir(params);
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