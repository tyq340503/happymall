const path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var webpack = require('webpack');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: WEBPACK_ENV == 'dev' ? 'bundle.js' : '//c.chaoxic.com/happymall/dist/'
	},
	resolve: {
		alias: {
			page: path.resolve(__dirname, './src/page'),
			component: path.resolve(__dirname, './src/component'),
			util: path.resolve(__dirname, './src/util'),
			service: path.resolve(__dirname, './src/service')
		}
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
		new HtmlwebpackPlugin({ template: __dirname + "/src/index.html" })
	],
	devServer: {
		port: 8080,
		contentBase: './dist',
		historyApiFallback: {
			index: 'index.html'
		},
		proxy: {
			'/manage': {
				target: 'http://admintest.happymmall.com',
				changeOrigin: true
			},

			'/user/logout.do': {
				target: 'http://admintest.happymmall.com',
				changeOrigin: true
			}
		}
	},
}
