var sqlDateTime = {};

var isoToSqlDateRegex = /([^T]+)T([^.]+)/;
var sqlDateToDateRegex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/;

sqlDateTime.toSqlDate = function(date) {
	var sqlDate;

	if (date) {
		if (typeof date === "object") {
			date = date.toISOString();
		}

		var matches = date.match(isoToSqlDateRegex);

		if (matches.length !== 3) {
			throw new Error("The date string was not an iso date string. " + date);
		}

		sqlDate = matches[1] + " " + matches[2];
	}

	return sqlDate;
};

sqlDateTime.toDate = function(date) {
	if (typeof date === "string") {
		var matches = date.match(sqlDateToDateRegex);

		if (matches && matches.length === 3) {
			date = matches[1] + "T" + matches[2] + ".000Z";
		}

		date = new Date(date);
	}

	return date;
};

module.exports = sqlDateTime;
