const path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:'./src/app.js',
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
	},
	plugins: [
		new HtmlwebpackPlugin()
	]
}
