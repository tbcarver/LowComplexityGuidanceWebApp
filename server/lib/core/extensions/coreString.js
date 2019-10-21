
var escapeRegex = require("../system/escapeRegEx").escapeRegEx;

var coreString = {};

coreString.compare = function(value, target, isCaseInsensitive) {

	if (isCaseInsensitive) {
		return (value.toLowerCase() === target.toLowerCase());
	} else {
		return (value === target);
	}
};

coreString.compareAny = function(values, search, isCaseInsensitive) {

	var isEqual = false;

	for (var value of values) {

		if (this.compare(value, search, isCaseInsensitive)) {

			isEqual = true;
			break;
		}
	}

	return isEqual;
};

coreString.includesAny = function(values, search) {

	var includes = false;

	for (var value of values) {

		if (search.includes(value)) {

			includes = true;
			break;
		}
	}

	return includes;
};

coreString.startsWithAny = function(values, search) {

	var startsWith = false;

	for (var value of values) {

		if (search.startsWith(value)) {

			startsWith = true;
			break;
		}
	}

	return startsWith;
};

coreString.compressWhiteSpace = function(value) {

	if (value) {

		value = value.replace(/\s+/g, " ");
	}

	return value;
}

coreString.trimStartString = function(value, trimString) {

	if (value) {

		trimString = escapeRegex(trimString);

		var regex = new RegExp("^" + trimString, "g");

		value = value.replace(regex, "");
	}

	return value;
}

const ellipsis = "...";

coreString.truncate = function(value, length, addEllipsis) {

	if (value) {

		if (addEllipsis) {

			length = length - ellipsis.length;
		}

		if (value.length > length) {

			value = value.substr(0, length);

			if (addEllipsis) {

				value += ellipsis;
			}
		}
	}

	return value;
}

coreString.addNumberInString = function(string, number) {

	var result = string.replace(/\d+/, function(value) {

		var parsedNumber = parseFloat(value);

		if (!isNaN(parsedNumber)) {

			value = parsedNumber + number;
		}

		return value;
	});

	return result;
}

module.exports = coreString;