
var utils = require('handlebars-utils');
var comparison = require("handlebars-helpers/lib/comparison");
var _ = require("lodash");

var comparisonHelpers = {};

// NOTE: These override the handlebars-helpers to allow for better use of inline as well as block.

function compareAB(a, b, outValue, options, comparedResult, comparisonKey) {

	var result = "";

	if (utils.isOptions(outValue)) {
		options = outValue;
	}

	if (utils.isOptions(options) && !utils.isBlock(options)) {

		if (comparedResult) {
			result = outValue;
		}

	} else {
		result = comparison[comparisonKey](a, b, options);
	}

	return result;
}

comparisonHelpers.is = function(a, b, outValue, options) {
	return compareAB(a, b, outValue, options, (a == b), "is");
};

comparisonHelpers.isnt = function(a, b, outValue, options) {
	return compareAB(a, b, outValue, options, (a == b), "isnt");
};

// Similar to handlebars-helpers 'contains', however, better named, does allow for objects as the collection,
//  and better use of inline.
comparisonHelpers.includes = function(collection, value, outValue, options) {

	if (utils.isOptions(outValue)) {
		options = outValue;
		outValue = undefined;
	}

	var result = "";

	if (utils.isBlock(options)) {

		if (_.includes(collection, value)) {
			result = options.fn(this);
		} else {
			result = options.inverse(this);
		};

	} else {
		if (_.includes(collection, value)) {
			result = outValue;
		}
	}

	return result;
}

module.exports = comparisonHelpers;