/**
	Determines the final row in a Google Sheets range
	@param {String} range Range to parse
	@returns {Number} Final row in range
*/
function getFinalRangeRow(range) {
	const finalRow = parseInt(range.slice(-1));
	if (isNaN(finalRow)) {
		return false;
	}
	return finalRow;
}

module.exports = {
	getFinalRangeRow
}