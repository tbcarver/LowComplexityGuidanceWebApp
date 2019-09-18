
var path = require("path");
var Database = require("better-sqlite3");

var sql = {};

var filePathName = path.resolve(process.env.CONNECTION_STRING);
sql.db = new Database(filePathName, { fileMustExist: true });

sql.executeScalar = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);
	var result;
	
	if (parameters) {
		result = statement.pluck(parameters);
	} else {
		result = statement.pluck();
	}

	if (result && result.length > 0) {
		result = result[0];
	}

	return result;
}

sql.executeRow = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);
	var result;
	
	if (parameters) {
		result = statement.get(parameters);
	} else {
		result = statement.get();
	}

	return result;
}

sql.executeQuery = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);
	var result;
	
	if (parameters) {
		result = statement.all(parameters);
	} else {
		result = statement.all();
	}

	return result;
}

sql.executeNonQuery = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);
	var result;
	
	if (parameters) {
		result = statement.run(parameters);
	} else {
		result = statement.run();
	}

	if (result && result.changes === 1) {
		result = result.lastInsertRowid;
	}

	return result;
}


module.exports = sql;