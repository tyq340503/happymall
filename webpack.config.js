const path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:'./src/app.js',
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
	},
	module: {
        rules: [
            {
                test: /\.js$/,
                use:{
					loader:'babel-loader',
					options:{
						presets:['env']
					}
				},
                exclude: [
                    path.join(__dirname, 'node_modules'),
                ]
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin()
	]
}
