
var sqlDateTime = require("../../betterSqlite/sqlDateTime");

var dateStringFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

var formatDateTimeHelper = {
	name: "formatDateTime"
};

formatDateTimeHelper.helper = function(date) {

	var formattedDate = "";

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		formattedDate = date.toLocaleDateString('us-EN', dateStringFormatOptions);
	}

	return formattedDate;
}


module.exports = formatDateTimeHelper;