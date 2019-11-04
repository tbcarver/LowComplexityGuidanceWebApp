
var coreFetch = require("../lib/core/extensions/coreFetch");

var logger = {};

logger.log = function(level, message, stack, url) {

	var options = coreFetch.getPostOptions({
		level: level,
		message: message,
		stack: stack,
		url: url,
	});

	fetch("/api/logs/add", options).then(function(response) {

		if (response.status !== 200) {
			console.error("An error has occurred while logging to the server.");
		}

	}.bind(this));
};

module.exports = logger;