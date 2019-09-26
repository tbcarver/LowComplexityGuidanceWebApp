
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
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	},
};

function renderDate(date, dateStringFormatOptions) {

	var formattedDate = "";

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		formattedDate = date.toLocaleDateString('us-EN', dateStringFormatOptions);
	}

	return formattedDate;
}

dateHelpers.date = function(date) {

	return renderDate(date, helpersDateStringFormatOptions["date"]);
}

dateHelpers.dateShort = function(date) {

	return renderDate(date, helpersDateStringFormatOptions["dateShort"]);
}

dateHelpers.dateTime = function(date) {

	return renderDate(date, helpersDateStringFormatOptions["dateTime"]);
}

dateHelpers.dateTimeShort = function(date) {

	return renderDate(date, helpersDateStringFormatOptions["dateTimeShort"]);
}


module.exports = dateHelpers;