
var addAttributeByCompareHelper = {
	name: "addAttributeByCompare"
};

addAttributeByCompareHelper.helper = function(attributeName, attributeValue, targetCompare, sourceCompare) {

	var addAttribute = "";

	if (targetCompare === sourceCompare) {

		addAttribute = attributeName;

		if (attributeValue) {

			addAttribute += "=" + attributeValue;
		}
	}

	return addAttribute;
}


module.exports = addAttributeByCompareHelper;