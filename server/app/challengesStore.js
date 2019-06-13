
var config = require("../config");
var directoryWalkerSync = require("../lib/core/fs/directoryWalkerSync");

const challengesStore = {};

challengesStore.getTitlesTree = function() {

	var titlesTree = [];

	directoryWalkerSync.walkDirectory(config.challengesPath, null, function(directoryPathName, stats) {

		titlesTree.push(directoryPathName);
	});

	return titlesTree;
}


module.exports = challengesStore;