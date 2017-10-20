const google = require('googleapis');
const auth = require('./auth.js');
const storeConfig = require('../config/store.config.js');
const sheets = google.sheets('v4');

function appendPromisified(params, options={}) {
	return new Promise((resolve, reject) => {
		sheets.spreadsheets.values.append(params, options, (err, response) => { 
			if (err) {
				reject(err);
			}
			else {
				resolve(response) 
			}
		});
	});
}

function appendSpreadsheet(auth, spreadsheetData, dataRows) {
	const resource = {
		majorDimension: 'ROWS',
		values: dataRows
	}
	const params = {
		spreadsheetId: spreadsheetData.spreadsheetId,
		range: spreadsheetData.range,
		valueInputOption: 'RAW',
		resource,
		auth
	}

	return appendPromisified(params, {});
}

function saveQuoteRequest(data) {
	const sheetId = storeConfig.spreadsheetId;
	const sheetName = storeConfig.spreadsheetName;

	const appendRange = sheetName + '!A2:N2';

	const spreadsheetData = {
		spreadsheetId: sheetId,
		range: appendRange
	}

	// quote data
	const rows = [[
		data.userFirstName,
		data.userLastName,
		data.userEmail,
		data.userPhone,
		data.contactPreference,
		data.userState,
		data.userZip,
		data.dealerId,
		data.dealerName,
		data.dealerAddress,
		data.dealerCity,
		data.dealerState,
		data.dealerZip,
		data.dealerPhone
	]];

	return auth.authenticateGoogleSheets(false)
	.then(auth => {
		return appendSpreadsheet(auth, spreadsheetData, rows);
	})
}

module.exports = {
	saveQuoteRequest
}