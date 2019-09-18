
var coreArray = {}


coreArray.includesAny = function(values, search) {

	var includes = false;

	for (var value of values) {

		if (search.includes(value)) {

			includes = true;
			break;
		}
	}

	return includes;
};

coreArray.incrementArrayIndex = function(targetArray, currentIndex) {

	currentIndex++

	if (currentIndex >= targetArray.length) {

		currentIndex = 0;
	}

	return currentIndex;
}

coreArray.pushValue = function(array, value) {
	
	if (value) {
		array.push(value);
	}
}


module.exports = coreArray;