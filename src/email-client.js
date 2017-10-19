require('dotenv').config({silent: true});
const sparkpost = require('sparkpost');

const debug = (pricess.env.NODE_ENV === 'dev');
const sparkpostKey = process.env.SPARKPOST_API_KEY;
const defaultOptions = {
	debug // disable before production!
}

/**
	Email client, abstracts underlying API/email logic
*/
class EmailClient {
	constructor(key, options) {
		this.client = new Sparkpost(key, options);
	}

	send() {

	}
}

/**
	Creates new email client
*/
function createClient() {
	return new EmailClient(sparkpostKey, defaultOptions);
}

module.exports = {
	createClient
}