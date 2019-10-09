
var appModel = require("../middlewares/appModel");

function initialize(app) {
	
	app.use(appModel);
}


module.exports.initialize = initialize;