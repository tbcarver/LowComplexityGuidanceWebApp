
var express = require("express");
var favicon = require('serve-favicon');
var path = require("path");
var directoryWalkerSync = require("../lib/core/fs/directoryWalkerSync");

function initialize(app) {

	app.use(favicon(path.join(__dirname, '../../assets/images', 'favicon.ico')));

	app.use("/assets", express.static("./assets"));
	app.use("/assets/vendor/bootstrap/4.3.1/", express.static("./node_modules/bootstrap/dist"));
	app.use("/assets/vendor/fontawesome-free/5.9.0/", express.static("./node_modules/@fortawesome/fontawesome-free"));
	app.use("/assets/vendor/jquery/3.3.1/", express.static("./node_modules/jquery/dist"));
	app.use("/assets/vendor/handlebars/4.1.2/", express.static("./node_modules/handlebars/dist"));	

	app.use("/client", express.static("./client"));	

	directoryWalkerSync.walkDirectory("./server/app", null, null, function(filePathName, stats) {

		if (filePathName.endsWith(".controller.js")) {

			var absoluteFilePathName = path.resolve(filePathName);
			var controller = require(absoluteFilePathName);

			if (controller && controller.initialize) {

				var router = express.Router();

				controller.initialize(router);
				app.use(router);
			}
		}
	});
}


module.exports.initialize = initialize;