
var sqlDateTime = {};

var isoToSqlDateRegex = /([^T]+)T([^.]+)/;

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
}


module.exports = sqlDateTime;