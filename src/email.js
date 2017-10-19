require('dotenv').config({silent: true});
const sparkpost = require('sparkpost');

const debug = (pricess.env.NODE_ENV === 'dev');
const sparkpostKey = process.env.SPARKPOST_API_KEY;
const sparkpostOptions = {
	debug // disable before production!
}
const emailClient = new SparkPost(sparkpostKey, sparkpostOptions);

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