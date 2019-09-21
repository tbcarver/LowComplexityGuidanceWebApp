
var sqlDateTime = require("../../betterSqlite/sqlDateTime");

var dateStringFormatOptions = {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit'
};

var formatDateShortHelper = {
	name: "formatDateShort"
};

formatDateShortHelper.helper = function(date) {

	var formattedDate = "";

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		formattedDate = date.toLocaleDateString('us-EN', dateStringFormatOptions);
	}

	return formattedDate;
}


module.exports = formatDateShortHelper;