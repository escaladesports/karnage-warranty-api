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

	send(recipients) {
		this.client.transmissions.send({
			options: {
				sandbox: true
			},
			content: {
				from: 'testing@goalrilla.com',
				subject: 'Hello World!',
				html: '<html><body><p>Testing mail transmission</p></body></html>',
				recipients: recipients.map(address => ({ address }))
			}
		})
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