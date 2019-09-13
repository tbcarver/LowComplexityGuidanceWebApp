
var fs = require('fs');
var path = require('path');

function readFile(pathName, stats, encoding, readFileExtensions, fileAction) {

    if (isValidFile(pathName, stats, readFileExtensions)) {

        var options;

        if (encoding) {

            options = { encoding: encoding };
        }

        var data = fs.readFileSync(pathName, options);

        fileAction(data, pathName);
    }
}

function isValidFile(pathName, stats, readFileExtensions) {

    var isValidFile = false;

    if (stats && stats.isFile()) {

        if (readFileExtensions) {

            var fileExtension = path.extname(pathName);

            for (var readFileExtension of readFileExtensions) {

                if (fileExtension === readFileExtension) {

                    isValidFile = true;
                    break;
                }
            }
        } else {

            isValidFile = true;
        }
    }

    return isValidFile;
}


if (typeof module != "undefined" && module.exports) {

    module.exports.readFile = readFile;
    module.exports.isValidFile = isValidFile;
}