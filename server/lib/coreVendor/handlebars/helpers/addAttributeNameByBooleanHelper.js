
var addAttributeNameByBooleanHelper = {
	name: "addAttributeNameByBoolean"
};

addAttributeNameByBooleanHelper.helper = function(attributeName, booleanValue) {

	return (booleanValue) ? attributeName : "";
}


export { addAttributeNameByBooleanHelper }