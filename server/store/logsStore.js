
var sql = require("../lib/coreVendor/betterSqlite/sql");
var sqlDateTime = require("../lib/coreVendor/betterSqlite/sqlDateTime");

var logsStore = {};

/** @param createdTimestamp required. Must be a Date or iso date string. */
logsStore.addLog = function(logMessage, requestUrl, username, stack, createdTimestamp) {

	username = username ? username.toLowerCase() : undefined;
	createdTimestamp = sqlDateTime.toSqlDate(createdTimestamp);

	sql.executeNonQuery(`
		INSERT INTO Logs (logMessage, requestUrl, username, stack, createdTimestamp)
		VALUES (@logMessage, @requestUrl, @username, @stack, @createdTimestamp)`,
		{ logMessage, requestUrl, username, stack, createdTimestamp });
}


module.exports = logsStore;