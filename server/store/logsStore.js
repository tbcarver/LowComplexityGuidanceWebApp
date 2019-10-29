
var sql = require("../../lib/coreVendor/betterSqlite/sql");
var WhereClause = require("../../lib/core/sql/whereClause");
var _ = require("lodash");
var sqlDateTime = require("../../lib/coreVendor/betterSqlite/sqlDateTime");

var logsStore = {};

logsStore.getLogs = function(logId) {

	var whereClause = new WhereClause();
	whereClause.addAndClause("logId = @logId", "logId", logId);

	var results = sql.executeQuery(
		`SELECT logId, logLevel, logMessage, httpStatus, requestUrl, userId, username, stack, createdDate
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

logsStore.getDescendingPagedLogs = function(pageNumber, pageSize, logLevel, httpStatus, userId, searchTerm) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var whereClause = new WhereClause();
	whereClause.addAndClause("logLevel = @logLevel", "logLevel", logLevel);
	whereClause.addAndClause("httpStatus = @httpStatus", "httpStatus", httpStatus);
	whereClause.addAndClause("userId = @userId", "userId", userId);
	whereClause.addAndClause("logMessage LIKE @searchTerm", "searchTerm", searchTerm ? `%${searchTerm}%` : "");

	var results = sql.executeQuery(
		`SELECT logId, logLevel, logMessage, httpStatus, requestUrl, userId, username, stack, createdDate
		FROM Logs
		WHERE logId NOT IN (SELECT logId FROM Logs
							${whereClause.buildWhere()}
							ORDER BY logId DESC
							LIMIT @offset) ${whereClause.buildAnd()}
		ORDER BY logId DESC
		LIMIT @limit`,
		Object.assign(limitOffset, whereClause.parameters));

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

logsStore.getCount = function(whereClause) {

	if (!whereClause) {
		whereClause = new WhereClause();
	}

	return sql.executeScalar(
		`SELECT COUNT(*)
		FROM Logs
		${whereClause.buildWhere()}`,
		whereClause.parameters);
};

/** @param createdDate required. Must be a Date or iso date string. */
logsStore.addLog = function(logLevel, logMessage, httpStatus, requestUrl, userId, username, stack, createdDate) {

	username = username ? username.toLowerCase() : undefined;
	createdDate = sqlDateTime.toSqlDate(createdDate);

	sql.executeNonQuery(
		`INSERT INTO Logs (logLevel, logMessage, httpStatus, requestUrl, userId, username, stack, createdDate)
		VALUES (@logLevel, @logMessage, @httpStatus, @requestUrl, @userId, @username, @stack, @createdDate)`,
		{ logLevel, logMessage, httpStatus, requestUrl, userId, username, stack, createdDate });
};

module.exports = logsStore;