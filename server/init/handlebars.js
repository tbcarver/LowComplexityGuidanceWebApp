
var expressHandlebars = require("express-handlebars");
var handlebarsHelpers = require("handlebars-helpers");
var _ = require("lodash");
var path = require("path");
var directoryWalkerSync = require("../../lib/core/fs/directoryWalkerSync");
var coreString = require("../../lib/core/extensions/coreString");

var helpersList = [];
var templateFilePaths;

helpersList.push(require("../../lib/coreVendor/handlebars/helpers/authHelpers"));
helpersList.push(require("../../lib/coreVendor/handlebars/helpers/comparisonHelpers"));
helpersList.push(require("../../lib/coreVendor/handlebars/helpers/dateTimeHelpers"));

function initialize(app) {

	var handlebars = expressHandlebars.create({
		extname: ".hbs",
		layoutsDir: "server/pages/layouts/dist/",
		partialsDir: {},
		defaultLayout: "main.layout.hbs",
		helpers: {},
	});

	// Custom partial loading to allow partials to be in any folder below server/pages
	// express-handlebars can use a thenable function to callback with an object with the partial names and
	//  compiled partials.

	handlebars.partialsDir.templates = {
		then: function(callback) {

			var cache = app.enabled("view cache");

			if (!templateFilePaths || !cache) {
				templateFilePaths = [];

				directoryWalkerSync.walkDirectory("./server/pages", null, null, function(filePathName, stats) {

					if (filePathName.endsWith(".partial.hbs")) {
						var partialName = coreString.replaceAll(filePathName, path.sep, "/");
						partialName = coreString.replaceStart(partialName, "server/pages/", "");
						partialName = coreString.replaceEnd(partialName, ".partial.hbs", "");

						templateFilePaths.push({
							partialName: partialName,
							filePathName: filePathName,
						});
					}
				});
			}

			var getTemplates = templateFilePaths.map(templateFilePath =>
				new Promise(function(resolve, reject) {
					handlebars.getTemplate(templateFilePath.filePathName, { cache })
						.then(function(template) {

							var nameTemplate = {
								name: templateFilePath.partialName,
								template: template,
							};

							resolve(nameTemplate);
						});
				}));

			Promise.all(getTemplates).then(function(nameTemplates) {

				var partials = nameTemplates.reduce(function(partials, nameTemplates) {

					partials[nameTemplates.name] = nameTemplates.template;
					return partials;
				}, {});

				callback(partials);
			});
		},
	};

	// NOTE: Order is important. coreVender helpers override handlebars-helpers.

	handlebarsHelpers.comparison({ handlebars: handlebars.handlebars });
	handlebarsHelpers.markdown({ handlebars: handlebars.handlebars });
	handlebarsHelpers.object({ handlebars: handlebars.handlebars });

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