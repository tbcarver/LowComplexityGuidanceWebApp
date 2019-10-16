
var sqlDateTime = require("../../betterSqlite/sqlDateTime");

var dateHelpers = {};

var helpersDateStringFormatOptions = {
	date: {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	},
	dateShort: {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit'
	},
	dateTime: {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	},
	dateTimeShort: {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit'
	},
};

function renderDate(date, dateStringFormatOptions) {

	var formattedDate = "";

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		formattedDate = date.toLocaleDateString('en-US', dateStringFormatOptions);
	}

	return formattedDate;
}

for (var dateHelperKey in helpersDateStringFormatOptions) {
	
	dateHelpers[dateHelperKey] = function(date) {

		return renderDate(date, helpersDateStringFormatOptions[dateHelperKey]);
	}
}


module.exports = dateHelpers;