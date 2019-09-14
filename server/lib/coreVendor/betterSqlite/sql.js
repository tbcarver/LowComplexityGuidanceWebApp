
var path = require("path");
var Database = require('better-sqlite3');

var sql = {};

var filePathName = path.resolve(process.env.CONNECTION_STRING);
sql.db = new Database(filePathName, { fileMustExist: true });

sql.executeScalar = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);

	return statement.pluck(parameters);
}

sql.executeRow = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);

	return statement.get(parameters);
}

sql.executeQuery = function(sqlStatement, parameters) {

	var statement = this.db.prepare(sqlStatement);

	return statement.all(parameters);
}


module.exports = sql;