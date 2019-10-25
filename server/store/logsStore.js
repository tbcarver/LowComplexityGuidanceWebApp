
var sql = require("../../lib/coreVendor/betterSqlite/sql");
var WhereClause = require("../../lib/core/sql/whereClause");
var _ = require("lodash");
var sqlDateTime = require("../../lib/coreVendor/betterSqlite/sqlDateTime");

var logsStore = {};

logsStore.getLogs = function(logId) {

	var whereClause = new WhereClause();
	whereClause.addAndClause("logId = @logId", "logId", logId);

	var results = sql.executeQuery(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate
		FROM Logs
		${whereClause.buildWhere()}`,
	whereClause.parameters);

	return results;
};

logsStore.getLog = function(logId) {

	var results = this.getLogs(logId);
	results = _.first(results);

	return results;
};

logsStore.getDescendingPagedLogs = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var results = sql.executeQuery(`
		SELECT logId, logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate
		FROM Logs
		WHERE logId NOT IN (SELECT logId FROM Logs
							ORDER BY logId DESC
							LIMIT @offset)
		ORDER BY logId DESC
		LIMIT @limit`,
	limitOffset);

	var total = 0;
	if (results.length > 0) {
		total = this.getCount();
	}

	results = {
		pagination: {
			pageNumber,
			pageSize,
			pageTotal: results.length,
			total,
		},
		logs: results,
	};

	return results;
};

logsStore.getCount = function() {

	return sql.executeScalar(`
	SELECT COUNT(*)
	FROM Logs`);
};

/** @param createdDate required. Must be a Date or iso date string. */
logsStore.addLog = function(logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate) {

	username = username ? username.toLowerCase() : undefined;
	createdDate = sqlDateTime.toSqlDate(createdDate);

	sql.executeNonQuery(`
		INSERT INTO Logs (logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate)
		VALUES (@logLevel, @logMessage, @httpStatus, @requestUrl, @username, @stack, @createdDate)`,
	{ logLevel, logMessage, httpStatus, requestUrl, username, stack, createdDate });
};

module.exports = logsStore;