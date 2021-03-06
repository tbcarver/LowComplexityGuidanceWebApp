
var coreObject = {};

coreObject.valuesToArray = function(object) {

	var values = [];
	var keys = Object.keys(object);

	for (var index in keys) {

		var key = keys[index];
		var value = object[key];

		values.push(value);
	}

	return values;
};

coreObject.forEach = function(object, callback) {

	Object.keys(object).forEach(function(key) {

		var value = object[key];

		callback(key, value);

	});
};

module.exports = coreObject;