
var addAttributeNameByCompareHelper = {
	name: "addAttributeNameByCompare"
};

addAttributeNameByCompareHelper.helper = function(attributeName, targetCompare, sourceCompare) {

	return (targetCompare === sourceCompare) ? attributeName : "";
}


export { addAttributeNameByCompareHelper }