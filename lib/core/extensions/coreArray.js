
var coreMath = require("./coreMath");

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

coreArray.randomIndex = function(array) {

	var randomIndex = 0;

	if (array && array.length > 0) {
		randomIndex = coreMath.randomInteger(0, array.length - 1);
	}

	return randomIndex;
};

coreArray.randomElement = function(array) {

	var randomElement;

	if (array && array.length > 0) {

		var randomIndex = this.randomIndex(array);
		randomElement = array[randomIndex];
	}

	return randomElement;
};

module.exports = coreArray;