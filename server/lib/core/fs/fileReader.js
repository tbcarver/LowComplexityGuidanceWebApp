
var fs = require('fs-extra');
var path = require('path');

function readFile(pathName, stats, readFileExtensions, encoding) {

    var promise;

    if (isValidFile(pathName, stats, readFileExtensions)) {

        var promise = new Promise(async function(resolve) {

            var options;

            if (encoding) {

                options = { encoding: encoding };
            }

            var data = await fs.readFile(pathName, options);

            resolve(data);
        });
    } else {

        promise = Promise.resolve();
    }

    return promise;
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
}