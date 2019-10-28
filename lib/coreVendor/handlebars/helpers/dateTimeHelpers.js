
var sqlDateTime = require("../../betterSqlite/sqlDateTime");

var dateTimeHelpers = {};

var helpersDateStringFormatOptions = {
	toDate: {
		year: "numeric",
		month: "long",
		day: "numeric",
	},
	toDateShort: {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
	},
	toDateTime: {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	},
	toDateTimeShort: {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	},
	toHour: {
		hour: "numeric",
		isTimeString: true,
	},
	toTime: {
		hour: "numeric",
		minute: "numeric",
		isTimeString: true,
	},
};

function renderDate(date, dateStringFormatOptions) {

	var formattedDate = "";

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		if (dateStringFormatOptions.isTimeString) {
			formattedDate = date.toLocaleTimeString("en-US", dateStringFormatOptions);
		} else {
			formattedDate = date.toLocaleDateString("en-US", dateStringFormatOptions);
		}

	}

	return formattedDate;
}

for (var dateHelperKey in helpersDateStringFormatOptions) {

	dateTimeHelpers[dateHelperKey] = function(date) {

		return renderDate(date, this);

	}.bind(helpersDateStringFormatOptions[dateHelperKey]);
}

dateTimeHelpers.toInputDate = function(date) {

	var inputDate;

	if (date) {

		if (typeof date === "string") {
			date = sqlDateTime.toDate(date);
		}

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = month.toLocaleString("en-US", { minimumIntegerDigits: 2 });
		var day = date.getUTCDate();
		day = day.toLocaleString("en-US", { minimumIntegerDigits: 2 });

		inputDate = `${year}-${month}-${day}`;
	}

	return inputDate;
};

module.exports = dateTimeHelpers;