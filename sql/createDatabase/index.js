
require("dotenv").config();

var fs = require("fs");
var path = require("path");
var Database = require("better-sqlite3");
var directoryWalkerSync = require("../../lib/core/fs/directoryWalkerSync");
var fileReaderSync = require("../../lib/core/fs/fileReaderSync");

var fileNamePath = path.resolve(process.env.CONNECTION_STRING);
var directoryPath = path.dirname(fileNamePath);
var force = false;
var create = false;

for (var arg of process.argv) {
	if (arg === "-f" || arg === "--force") {
		force = true;
	}
}

if (fs.existsSync(fileNamePath)) {
	if (force) {
		fs.unlinkSync(fileNamePath);
		create = true;
	} else {
		console.log(`Warning: The file ${fileNamePath} already exists. Use -f or --force to overwrite the file.`);
	}
} else {
	fs.mkdirSync(directoryPath);
	create = true;
}

if (create) {

	var db = new Database(fileNamePath, { verbose: console.log });

	// Use write-ahead logging for better performance: http://advanced.brickhousecodecamp.org/docs/sqlite/www.sqlite.org/wal.html
	db.pragma("journal_mode = WAL");

	var filesRead = 0;


	var directoryStatistics = directoryWalkerSync.walkDirectory(__dirname, null, null, function(filePathName, stats) {

		fileReaderSync.readFile(filePathName, stats, "utf8", [".sql"], function(data, pathName) {

			console.log(pathName);

			db.exec(data);

			filesRead++;
		});
	});

	console.log("");
	console.log("Directories found: " + directoryStatistics.directoriesFound);
	console.log("Files found: " + directoryStatistics.filesFound);
	console.log("Files read: " + filesRead);
}