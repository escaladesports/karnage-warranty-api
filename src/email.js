const createClient = require('./email-client.js').createClient;
/**
	Sends a quote request email filled-out with param data to specified recipients
	@param {Object} data Quote request data from form/etc.
	@param {String|Array.<String>} sendTo String or array of strings with email addresses of recipients
	@returns {Promise}
*/
function sendQuoteRequestEmail(data, sendTo) {
// take data and send to sendTo
	const client = createClient();
	const subject = 'New dealer quote request from goalrilla.com';
	const message = `<html><body><p>Dealer quote request received from goalrilla.com:</p>
	<h2>User</h2>
	<ul>
		<li>First name: ${data.userFirstName}</li>
		<li>Last name: ${data.userLastName}</li>
		<li>Email: ${data.userEmail}</li>
		<li>Phone: ${data.userPhone}</li>
		<li>State: ${data.userState}</li>
		<li>Zip code: ${data.userZip}</li>
	</ul>
	<h2>Dealer</h2>
	<ul>
		<li>ID: ${data.dealerId}</li>
		<li>Name: ${data.dealerName}</li>
		<li>Phone: ${data.dealerPhone}</li>
		<li>Address: ${data.dealerAddress}</li>
		<li>City: ${data.dealerCity}</li>
		<li>State: ${data.dealerState}</li>
		<li>Zip code: ${data.dealerZip}</li>
	</ul>
	</body></html>`;

	return client.send({subject, message}, sendTo);
}

module.exports = {
	sendQuoteRequestEmail
}