
/*!
 * escape-string-regexp
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * MIT Licensed
 */

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

function escapeRegEx(text) {

	if (typeof text !== "string") {
		throw new TypeError("Expected a string");
	}

	return text.replace(matchOperatorsRe, "\\$&");
}

module.exports.escapeRegEx = escapeRegEx;