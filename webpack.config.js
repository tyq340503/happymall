const path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin  = require('extract-text-webpack-plugin');
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
				use: ['css-loader', 'sass-loader', 'style-loader']
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'resource/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [
					{
						loader: 'url-loader',
					}
				]
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin({ template: __dirname + "/src/indexhtml.html"})
	],
	devServer: {
		contentBase: './dist'
	},
}
