
var fs = require('fs-extra');
var path = require('path');

async function walkDirectory(pathName, directoryStatistics, fileAction) {

	directoryStatistics = ensureDirectoryStatistics(directoryStatistics);

	var results = null;
	var stats = await fs.stat(pathName);

	if (stats.isDirectory()) {

		directoryStatistics.directoriesFound++;

		var files = await fs.readdir(pathName);

		var promisesList = files.map(async function(file) {

			var subPathName = path.resolve(pathName, file);
			return await walkDirectory(subPathName, directoryStatistics, fileAction);
		})

		results = Promise.all(promisesList).then(function(combinedResults) {

			var finalResults;

			if (combinedResults && combinedResults.length > 0) {

				finalResults = combinedResults[0];
			}

			return finalResults;
		});

	} else if (stats.isFile()) {

		directoryStatistics.filesFound++;

		if (fileAction) {

			await fileAction(pathName, stats);
		}

		results = directoryStatistics;

	} else {

		throw new Error("Path not found: " + pathName);
	}

	return results;
}

function ensureDirectoryStatistics(directoryStatistics) {

	if (!directoryStatistics) {

		directoryStatistics = {
			directoriesFound: 0,
			filesFound: 0
		}
	}

	if (!directoryStatistics.directoriesFound) {

		directoryStatistics.directoriesFound = 0;
	}

	if (!directoryStatistics.filesFound) {

		directoryStatistics.filesFound = 0;
	}

	return directoryStatistics;
}


if (typeof module != "undefined" && module.exports) {

	module.exports.walkDirectory = walkDirectory;
}
