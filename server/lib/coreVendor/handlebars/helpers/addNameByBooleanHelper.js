
var addNameByBooleanHelper = {
	name: "addNameByBoolean"
};

addNameByBooleanHelper.helper = function(name, booleanValue) {

	return (booleanValue) ? name : "";
}


module.exports = addNameByBooleanHelper;