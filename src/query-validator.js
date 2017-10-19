function validateQuotePost(params) {
	// check for missing data
	if (
		!params.dealerId || !params.dealerName || !params.dealerAddress || !params.dealerCity
		|| !params.dealerState || !params.dealerZip || !params.dealerPhone || !params.userFirstName
		|| !params.userLastName || !params.userEmail || !params.userPhone || !params.contactPreference
		|| !params.userState || !params.userZip
	) {
		return false;
	}
	return true;
}

module.exports = {
	validateQuotePost
}