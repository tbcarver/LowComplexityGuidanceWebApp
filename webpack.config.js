
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	target: "web",
	mode: "development",
	entry: "./client/app.js",
	output: {
		path: __dirname + "/assets/dist",
		publicPath: "/assets/dist",
		filename: "app-[contenthash].js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								includePaths: ['node_modules/bootstrap/scss'],
							},
						},
					},
				]
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader",
				include: /client/,
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "main-[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			filename: "../../server/app/layouts/dist/main.layout.hbs",
			template: "./server/app/layouts/src/main.layout.hbs",
			inject: false,
		}),
	],
}