
var coreBoolean = {}

coreBoolean.convert = function(value) {

	var result = !!value;

	if (typeof value === "string") {
		if (isNaN(value)) {
			result = (value.toLowerCase() === "true");
		}
	}

	return result;
}


export default coreBoolean