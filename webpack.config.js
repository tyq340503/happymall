const path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
				},
				exclude: [
					path.join(__dirname, 'node_modules'),
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader:'url-loader',
						option:{
							limit:8192,
							name:'resource/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [
					{
						loader:'url-loader',
						option:{
							limit:8192
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin(),
		new ExtractTextPlugin('index.css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		})
	]
}
