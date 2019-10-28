
var coreBoolean = require("./coreBoolean");

var coreTypeOf = {};

coreTypeOf.convert = function(value, type) {

	switch (type) {
	case "boolean":
		value = coreBoolean.convert(value);
		break;

	case "integer":
		value = parseInt(value);
		break;

	case "float":
		value = parseFloat(value);
		break;
	}

	return value;
};

module.exports = coreTypeOf;