
var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var directoryWalkerSync = require("../../lib/core/fs/directoryWalkerSync");

function initialize(app, acl) {

	acl.allow("public exact", "/favicon.ico", "*");
	app.use(favicon(path.join(__dirname, "../../assets/images", "favicon.ico")));

	var oneYearInMilliseconds = 60 * 1000 * 60 * 24 * 365; // 31536000
	var staticOptions = { maxAge: oneYearInMilliseconds };

	acl.allow("public starts with", "/assets", "*");
	app.use("/assets", express.static("./assets", staticOptions));
	app.use("/assets/vendor/bootstrap/4.3.1/", express.static("./node_modules/bootstrap/dist", staticOptions));
	app.use("/assets/vendor/fontawesome-free/5.9.0/", express.static("./node_modules/@fortawesome/fontawesome-free",
		staticOptions));
	app.use("/assets/vendor/fontawesome/4.7.0/", express.static("./node_modules/font-awesome", staticOptions));
	app.use("/assets/vendor/jquery/3.3.1/", express.static("./node_modules/jquery/dist", staticOptions));
	app.use("/assets/vendor/typeahead.js/0.11.1/", express.static("./node_modules/typeahead.js/dist", staticOptions));
	app.use("/assets/vendor/bootstrap-notify/3.1.3/", express.static("./node_modules/bootstrap-notify", staticOptions));

	directoryWalkerSync.walkDirectory("./server/api", null, null, function(filePathName, stats) {

		if (filePathName.endsWith(".controller.js")) {

			var absoluteFilePathName = path.resolve(filePathName);
			var controller = require(absoluteFilePathName);

			if (controller && controller.initialize) {

				controller.initialize(app, acl);
			}
		}
	});

	directoryWalkerSync.walkDirectory("./server/pages", null, null, function(filePathName, stats) {

		if (filePathName.endsWith(".controller.js")) {

			var absoluteFilePathName = path.resolve(filePathName);
			var controller = require(absoluteFilePathName);

			if (controller && controller.initialize) {

				controller.initialize(app, acl);
			}
		}
	});
}

module.exports.initialize = initialize;