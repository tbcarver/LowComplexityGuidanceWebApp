
var utils = require('handlebars-utils');
var comparison = require("handlebars-helpers/lib/comparison");

var comparisonHelpers = {};

// NOTE: These override the handlebars-helpers to allow for better use of inline as well as block.

function compareAB(a, b, value, options, comparedResult, comparisonKey) {

	var result = "";

	if (utils.isOptions(options) && !utils.isBlock(options)) {

		if (comparedResult) {
			result = value;
		}
	} else {
		result = comparison[comparisonKey](a, b, options);
	}

	return result;
}

comparisonHelpers.is = function(a, b, value, options) {
	return compareAB(a, b, value, options, (a == b), "is");
};

comparisonHelpers.isnt = function(a, b, value, options) {
	return compareAB(a, b, value, options, (a == b), "isnt");
};


module.exports = comparisonHelpers;