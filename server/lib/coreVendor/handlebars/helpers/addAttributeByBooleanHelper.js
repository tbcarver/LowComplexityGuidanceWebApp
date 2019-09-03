
var addAttributeByBooleanHelper = {
	name: "addAttributeByBoolean"
};

addAttributeByBooleanHelper.helper = function(attributeName, attributeValue, booleanValue) {

	var addAttribute = "";

	if (booleanValue) {

		addAttribute = attributeName;

		if (attributeValue) {

			addAttribute += "=" + attributeValue;
		}
	}

	return addAttribute;
}


module.exports = addAttributeByBooleanHelper;