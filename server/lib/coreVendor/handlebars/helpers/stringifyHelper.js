
var _ = require("lodash");

var stringifyHelper = {
	name: "stringify"
};

stringifyHelper.helper = function(object) {

	var json = JSON.stringify(object);
	json = _.escape(json);

	return json;
}


module.exports = stringifyHelper;