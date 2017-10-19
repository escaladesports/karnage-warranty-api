/**
	Sends a quote request email filled-out with param data to specified recipients
	@param {Object} data Quote request data from form/etc.
	@param {String|Array.<String>} sendTo String or array of strings with email addresses of recipients
	@returns {Promise}
*/
function sendQuoteRequestEmail(data, sendTo) {
// take data and send to sendTo
	return Promise.resolve('true');
}

module.exports = {
	sendQuoteRequestEmail
}