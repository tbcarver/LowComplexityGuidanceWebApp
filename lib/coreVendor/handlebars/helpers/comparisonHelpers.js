/* eslint eqeqeq: ["off"] */

var utils = require("handlebars-utils");
var falsey = require("falsey");
var _ = require("lodash");

var comparisonHelpers = {};

// NOTE: These override the handlebars-helpers to allow for better use of inline use, block use, and
//  not changing the model context requiring ../model.

function buildInlineOrBlockResult(isTrue, outValue, options) {

	var result = "";
	options = (utils.isOptions(outValue)) ? outValue : options;

	if (utils.isBlock(options)) {
		result = utils.value(isTrue, options.data.root, options);
	} else {
		result = isTrue ? outValue : "";
	}

	return result;
}

comparisonHelpers.is = function(a, b, outValue, options) {

	var isTrue = (a == b);
	return buildInlineOrBlockResult(isTrue, outValue, options);
};

comparisonHelpers.isnt = function(a, b, outValue, options) {

	var isTrue = (a != b);
	return buildInlineOrBlockResult(isTrue, outValue, options);
};

comparisonHelpers.isTruthy = function(value, outValue, options) {

	var isTrue = !falsey(value);
	return buildInlineOrBlockResult(isTrue, outValue, options);
};

comparisonHelpers.isFalsey = function(value, outValue, options) {

	var isTrue = falsey(value);
	return buildInlineOrBlockResult(isTrue, outValue, options);
};

// Similar to handlebars-helpers 'contains', however, better named and does allow for objects as the collection.
comparisonHelpers.includes = function(collection, value, outValue, options) {

	var isTrue = _.includes(collection, value);
	return buildInlineOrBlockResult(isTrue, outValue, options);
};

module.exports = comparisonHelpers;