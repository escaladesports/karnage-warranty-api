const createClient = require('./email-client.js').createClient;
/**
	Sends a warranty registration notification filled-out with param data to specified recipients
	@param {Object} data Warranty registration data from form/etc.
	@param {String|Array.<String>} sendTo String or array of strings with email addresses of recipients
	@returns {Promise}
*/
function sendWarrantyRegistrationEmail(data, sendTo) {
// take data and send to sendTo
	const client = createClient();
	const subject = 'New warranty registration from karnagecrossbows.com';
	const message = `<html><body><p>Warranty registration received from karnagecrossbows.com:</p>
	<p>Request ID: ${data.requestId}</p>
	<h2>Bow Information</h2>
	<ul>
		<li>Model: ${data.bowModel}</li>
		<li>Serial number: ${data.bowSerialNumber}</li>
		<li>Received as gift?: ${data.receivedGift}</li>
	</ul>
	<h2>Customer Information</h2>
	<ul>
		<li>First name: ${data.userFirstName}</li>
		<li>Last name: ${data.userLastName}</li>
		<li>Address: ${data.userAddress}</li>
		<li>City: ${data.userCity}</li>
		<li>State: ${data.userState}</li>
		<li>Zip code: ${data.userZip}</li>
		<li>Country: ${data.userCountry}</li>
		<li>Phone: ${data.userPhone}</li>
		<li>Email: ${data.userEmail}</li>
	</ul>
	<h2>Dealer Information</h2>
	<ul>
		<li>Store Name: ${data.dealerName}</li>
		<li>Address: ${data.dealerAddress}</li>
		<li>City: ${data.dealerCity}</li>
		<li>State: ${data.dealerState}</li>
		<li>Zip code: ${data.dealerZip}</li>
		<li>Country: ${data.dealerCountry}</li>
	</ul>
	</body></html>`;

	return client.send({subject, message}, sendTo);
}

module.exports = {
	sendWarrantyRegistrationEmail
}