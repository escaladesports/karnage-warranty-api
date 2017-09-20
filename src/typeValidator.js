/**
* Checks whether data is a string
* @param {*} data Data to validate as string
* @returns {Boolean}
*/
function isString(data) {
	if (!data) {
		return false;
	}

	return (typeof data === 'string' || data instanceof String);
}

module.exports = {
	isString
}