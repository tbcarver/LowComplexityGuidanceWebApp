
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

logsStore.getPagedLogs = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var result = sql.executeQuery(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdTimestamp
		FROM Logs
		WHERE logId NOT IN (SELECT logId FROM Logs
							ORDER BY logId DESC LIMIT @offset)
		ORDER BY logId DESC LIMIT @limit`,
		limitOffset);

	var total = 0;
	if (result.length > 0) {
		total = this.getCount();
	}

	result = {
		pageNumber,
		pageSize,
		logs: result,
		total,
	};

	return result;
}

logsStore.getLog = function(logId) {

	var result = sql.executeRow(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdTimestamp
		FROM Logs
		WHERE logId = @logId`,
		{ logId });

	return result;
}

logsStore.getCount = function() {

	return sql.executeScalar('SELECT COUNT(*) FROM Logs');
}


module.exports = logsStore;