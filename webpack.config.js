
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	target: 'node',
	entry: './client/app.js',
	output: {
		path: __dirname + '/assets/js/client',
		publicPath: '/assets/js/client',
		filename: 'app-[hash].js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.hbs$/,
				loader: "handlebars-loader",
				include: /client/,
			}
		]
	},
	plugins: [new HtmlWebpackPlugin(
		{
			filename: '../../../server/app/layouts/dist/main.layout.hbs',
			template: './server/app/layouts/src/main.layout.hbs',
			inject: false,
		}
	)],
}