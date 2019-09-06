
var escapeRegex = require("../system/escapeRegEx").escapeRegEx;

function compare(value, target, isCaseInsensitive) {

	if (isCaseInsensitive) {
		return (value.toLowerCase() === target.toLowerCase());
	} else {
		return (value === target);
	}
};

function compareAny(values, search, isCaseInsensitive) {

	var isEqual = false;

	for (var value of values) {

		if (compare(value, search, isCaseInsensitive)) {

			isEqual = true;
			break;
		}
	}

	return isEqual;
};

function includesAny(values, search) {

	var includes = false;

	for (var value of values) {

		if (search.includes(value)) {

			includes = true;
			break;
		}
	}

	return includes;
};

function startsWithAny(values, search) {

	var startsWith = false;

	for (var value of values) {

		if (search.startsWith(value)) {

			startsWith = true;
			break;
		}
	}

	return startsWith;
};

function compressWhiteSpace(value) {

	if (value) {

		value = value.replace(/\s+/g, " ");
	}

	return value;
}

function trimStartString(value, trimString) {

	if (value) {

		trimString = escapeRegex(trimString);

		var regex = new RegExp("^" + trimString, "g");

		value = value.replace(regex, "");
	}

	return value;
}

const ellipsis = "...";

function truncate(value, length, addEllipsis) {

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


if (typeof module != "undefined" && module.exports) {

	module.exports.compare = compare;
	module.exports.compareAny = compareAny;
	module.exports.includesAny = includesAny;
	module.exports.startsWithAny = startsWithAny;
	module.exports.compressWhiteSpace = compressWhiteSpace;
	module.exports.trimStartString = trimStartString;
	module.exports.truncate = truncate;
}