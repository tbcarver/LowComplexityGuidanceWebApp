
var isHelper = {
	name: "is"
};

isHelper.helper = function(target, source, options) {

	var result;

	if (target === source) {
		result = options.fn(this);
	} else {
		result = options.inverse(this);
	}

	return result;
}


module.exports = isHelper;