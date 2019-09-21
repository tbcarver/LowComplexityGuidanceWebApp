
var sqlDateTime = require("../../betterSqlite/sqlDateTime");

var dateStringFormatOptions = {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
};

var formatDateTimeShortHelper = {
	name: "formatDateTimeShort"
};

formatDateTimeShortHelper.helper = function(date) {

	var formattedDate = "";

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		formattedDate = date.toLocaleDateString('us-EN', dateStringFormatOptions);
	}

	return formattedDate;
}


module.exports = formatDateTimeShortHelper;