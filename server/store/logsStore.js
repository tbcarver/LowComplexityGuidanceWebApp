
var sql = require("../lib/coreVendor/betterSqlite/sql");
var sqlDateTime = require("../lib/coreVendor/betterSqlite/sqlDateTime");

var logsStore = {};

/** @param createdTimestamp required. Must be a Date or iso date string. */
logsStore.addLog = function(logLevel, logMessage, httpStatus, requestUrl, username, stack, createdTimestamp) {

	username = username ? username.toLowerCase() : undefined;
	createdTimestamp = sqlDateTime.toSqlDate(createdTimestamp);

	sql.executeNonQuery(`
		INSERT INTO Logs (logLevel, logMessage, httpStatus, requestUrl, username, stack, createdTimestamp)
		VALUES (@logLevel, @logMessage, @httpStatus, @requestUrl, @username, @stack, @createdTimestamp)`,
		{ logLevel, logMessage, httpStatus, requestUrl, username, stack, createdTimestamp });
}

logsStore.getLogs = function() {

	var result = sql.executeQuery(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdTimestamp
		FROM Logs`);

	return result;
}


module.exports = logsStore;