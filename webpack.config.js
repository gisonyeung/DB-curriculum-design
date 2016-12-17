var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');

module.exports = {
	entry: [
    	'webpack-hot-middleware/client?reload=true&http://localhost:8000',
		'webpack/hot/only-dev-server',
		'./src/app.js',
	],
	output: {
		path: path.join(__dirname,"/server/app/static"),
		filename: 'bundle.js',
		publicPath: "/static/"
	},
	resolve: {
		extensions: ['', '.vue', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loaders: 'vue-loader',
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.scss$/,
				loader: "style!css!sass"
			},
			{
				test: /\.(jpg|png|jpeg|gif)$/,
				loader: "url?limit=8192"
			},
			{
				test: /\.(woff|svg|ttf|eot)/,
				loader: "file"
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 8000,
	},

}