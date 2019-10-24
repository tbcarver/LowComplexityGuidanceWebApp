
var _ = require("lodash");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require("../../webpack.config.js");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

function initialize(app, acl, callback) {

	if (process.env.NODE_ENV_CLIENT === "development") {

		webpackConfig.output.filename = webpackConfig.output.filename.replace("[contenthash]", "development");

		// Remove the mini-css-extract-plugin to allow for css injection for hot reloading
		var sassRule = _.find(webpackConfig.module.rules, { "test": /\.scss$/ });
		var index = sassRule.use.findIndex(function(use) {
			return use.includes("mini-css-extract-plugin");
		});

		if (index !== -1) {
			sassRule.use.splice(index, 1);
		}

		index = webpackConfig.plugins.findIndex(function(plugin) {
			return MiniCssExtractPlugin.prototype.isPrototypeOf(plugin);
		});

		if (index !== -1) {
			var miniCssExtractPlugin = webpackConfig.plugins[index];
			miniCssExtractPlugin.options.filename = miniCssExtractPlugin.options.filename.replace("[contenthash]",
				"development");

			miniCssExtractPlugin = new MiniCssExtractPlugin({
				filename: miniCssExtractPlugin.options.filename,
			});

			webpackConfig.plugins[index] = miniCssExtractPlugin;
		}

		var plugins = webpackConfig.plugins;
		webpackConfig.plugins = [];

		var oneTimeCompilerConfig = _.cloneDeep(webpackConfig);
		oneTimeCompilerConfig.plugins = plugins;

		console.log("Client development webpack one time compile started...");

		webpack(oneTimeCompilerConfig, function() {
			console.log("Client development webpack one time compile complete.");

			var devConfig = _.cloneDeep(webpackConfig);

			devConfig.plugins.push(miniCssExtractPlugin);

			// NOTE: This expects one entry point and should be changed in more entry points are added.
			devConfig.entry = [devConfig.entry];

			// Enable auto reloading when changing JS files or content and time in between disconnecting and
			//  reconnecting to the server
			devConfig.entry.unshift("webpack-hot-middleware/client?reload=true&timeout=1000");
			devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

			var webpackCompiler = webpack(devConfig);

			app.use(webpackDevMiddleware(webpackCompiler, {
				publicPath: webpackConfig.output.publicPath
			}));

			acl.allow("public exact", "/__webpack_hmr", "*");
			app.use(webpackHotMiddleware(webpackCompiler));

			callback();
		});

	} else {
		callback();
	}
}

module.exports.initialize = initialize;