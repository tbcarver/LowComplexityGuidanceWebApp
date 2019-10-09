
var appModel = require("../middlewares/appModel");
var auth = require("../middlewares/auth");

function initialize(app) {
	
	app.use(appModel);
	app.use(auth);
}


module.exports.initialize = initialize;