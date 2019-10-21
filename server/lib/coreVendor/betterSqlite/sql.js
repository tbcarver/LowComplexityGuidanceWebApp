
var path = require("path");
var Database = require("better-sqlite3");
var _ = require("lodash");

var sql = {};

var filePathName = path.resolve(process.env.CONNECTION_STRING);
db = new Database(filePathName, { fileMustExist: true });

// Use write-ahead logging for better performance:
//  http://advanced.brickhousecodecamp.org/docs/sqlite/www.sqlite.org/wal.html
db.pragma("journal_mode = WAL");

sql.executeScalar = function(sqlStatement, parameters) {

	var statement = db.prepare(sqlStatement);
	var result;

	if (!_.isEmpty(parameters)) {
		result = statement.pluck().get(parameters);
	} else {
		result = statement.pluck().get();
	}

	return result;
}

sql.executeRow = function(sqlStatement, parameters) {

	var statement = db.prepare(sqlStatement);
	var result;

	if (!_.isEmpty(parameters)) {
		result = statement.get(parameters);
	} else {
		result = statement.get();
	}

	return result;
}

sql.executeQuery = function(sqlStatement, parameters) {

	var statement = db.prepare(sqlStatement);
	var result;

	if (!_.isEmpty(parameters)) {
		result = statement.all(parameters);
	} else {
		result = statement.all();
	}

	return result;
}

sql.executeNonQuery = function(sqlStatement, parameters) {

	var statement = db.prepare(sqlStatement);
	var result;

	if (!_.isEmpty(parameters)) {
		result = statement.run(parameters);
	} else {
		result = statement.run();
	}

	if (result && result.changes === 1) {
		result = result.lastInsertRowid;
	}

	return result;
}

sql.getLimitOffset = function(pageNumber, pageSize) {

	var limitOffset = {
		limit: pageSize,
		offset: (pageNumber - 1) * pageSize,
	}

	return limitOffset;
}

sql.transaction = function(execute) {

	var newTransaction = db.transaction(execute);

	newTransaction();
}

module.exports = sql;