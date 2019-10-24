
var coreArray = {};

coreArray.includesAny = function(values, search) {

	var includes = false;

	if (values && search) {

		for (var value of values) {

			if (search.includes(value)) {

				includes = true;
				break;
			}
		}

	}

	return includes;
};

coreArray.incrementArrayIndex = function(targetArray, currentIndex) {

	currentIndex++;

	if (currentIndex >= targetArray.length) {

		currentIndex = 0;
	}

	return currentIndex;
};

coreArray.pushValue = function(array, value) {

	if (value) {
		array.push(value);
	}
};

coreArray.trim = function(array) {

	if (array) {
		for (var index = 0; index < array.length; index++) {
			if (typeof array[index] === "string") {
				array[index] = array[index].trim();
			}
		}
	}
};

module.exports = coreArray;