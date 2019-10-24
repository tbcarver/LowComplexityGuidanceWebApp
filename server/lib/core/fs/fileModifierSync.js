
var fs = require("fs");
var path = require("path");

function modifyFile(pathName, encoding, fileExtensionFilters, fileAction) {

	var fileExtension = path.extname(pathName);

	if (fs.existsSync(pathName) && isValidFile(fileExtension, fileExtensionFilters)) {

		var options;

		if (encoding) {

			options = { encoding: encoding };
		}

		var data = fs.readFileSync(pathName, options);

		var modifiedData = fileAction(data, pathName, fileExtension);
        
		options.flag = "w";
		fs.writeFileSync(pathName, modifiedData, options);
	}
}

function isValidFile(fileExtension, fileExtensionFilters) {

	var isValidFile = false;

	for (var fileExtensionFilter of fileExtensionFilters) {

		if (fileExtension === fileExtensionFilter) {

			isValidFile = true;
			break;
		}
	}

	return isValidFile;
}

module.exports.modifyFile = modifyFile;