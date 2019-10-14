
var expressHandlebars = require("express-handlebars");
var handlebarsHelpers = require("handlebars-helpers");
var _ = require("lodash");

var helpersList = [];

helpersList.push(require("../lib/coreVendor/handlebars/helpers/authHelpers"));
helpersList.push(require("../lib/coreVendor/handlebars/helpers/comparisonHelpers"));
helpersList.push(require("../lib/coreVendor/handlebars/helpers/dateHelpers"));

function initialize(app) {

	var handlebars = expressHandlebars.create({
		extname: ".hbs",
		layoutsDir: "server/pages/layouts/dist/",
		partialsDir: "server/pages/partials/",
		defaultLayout: "main.layout.hbs",
		helpers: {},
	});

	handlebarsHelpers.comparison({ handlebars: handlebars.handlebars });
	handlebarsHelpers.markdown({ handlebars: handlebars.handlebars });
	handlebarsHelpers.object({ handlebars: handlebars.handlebars });

	// NOTE: Order is important. coreVender helpers may override handlebars-helpers.

	for (var helpers of helpersList) {
		_.forEach(helpers, function(helper, helperName) {
			handlebars.helpers[helperName] = helper;
		});
	}

	app.engine("hbs", handlebars.engine);
	app.set("view engine", "hbs");
	app.set("views", "server/pages");
}


module.exports.initialize = initialize;