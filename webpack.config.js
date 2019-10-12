
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	target: "web",
	mode: "development",
	entry: "./client/main.js",
	output: {
		path: __dirname + "/assets/dist",
		publicPath: "/assets/dist/",  // Final slash is important for hot reloading webpack-dev-server/issues/252
		filename: "main-[contenthash].js",
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
								includePaths: [
									"node_modules/bootstrap/scss",
									"node_modules/animate.css/source"
								],
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
		new HtmlWebpackPlugin({
			filename: "../../server/app/layouts/dist/oneColumn.layout.hbs",
			template: "./server/app/layouts/src/oneColumn.layout.hbs",
			inject: false,
		}),
	],
}