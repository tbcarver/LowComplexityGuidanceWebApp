
var addNameByCompareHelper = {
	name: "addNameByCompare"
};

addNameByCompareHelper.helper = function(name, targetCompare, sourceCompare) {

	return (targetCompare === sourceCompare) ? name : "";
}


module.exports = addNameByCompareHelper;