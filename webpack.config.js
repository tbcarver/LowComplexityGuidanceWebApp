
module.exports = {
	target: 'node',
	entry: './client/app.js',
	output: {
		path: __dirname + '/assets/js',
		filename: 'app.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
		  { test: /\.hbs$/, loader: "handlebars-loader" }
		]
	  },
}