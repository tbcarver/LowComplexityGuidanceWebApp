
var sql = require("../lib/coreVendor/betterSqlite/sql");
var sqlDateTime = require("../lib/coreVendor/betterSqlite/sqlDateTime");

var logsStore = {};

logsStore.getLogs = function() {

	var result = sql.executeQuery(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate
		FROM Logs`);

	return result;
}

logsStore.getDescendingPagedLogs = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var result = sql.executeQuery(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate
		FROM Logs
		WHERE logId NOT IN (SELECT logId FROM Logs
							ORDER BY logId DESC
							LIMIT @offset)
		ORDER BY logId DESC
		LIMIT @limit`,
		limitOffset);

	var total = 0;
	if (result.length > 0) {
		total = this.getCount();
	}

	result = {
		pagination: {
			pageNumber,
			pageSize,
			pageTotal: result.length,
			total,
		},
		logs: result,
	};

	return result;
}

logsStore.getLog = function(logId) {

	var result = sql.executeRow(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate
		FROM Logs
		WHERE logId = @logId`,
		{ logId });

	return result;
}

logsStore.getCount = function() {

	return sql.executeScalar(`
	SELECT COUNT(*)
	FROM Logs`);
}

/** @param createdDate required. Must be a Date or iso date string. */
logsStore.addLog = function(logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate) {

	username = username ? username.toLowerCase() : undefined;
	createdDate = sqlDateTime.toSqlDate(createdDate);

	sql.executeNonQuery(`
		INSERT INTO Logs (logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate)
		VALUES (@logLevel, @logMessage, @httpStatus, @requestUrl, @username, @stack, @createdDate)`,
		{ logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate });
}


module.exports = logsStore;