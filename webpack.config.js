var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');

module.exports = {
	entry: [
    	'webpack-hot-middleware/client?reload=true&http://localhost:7000',
		'webpack/hot/only-dev-server',
		'./src/app.js',
	],
	output: {
		path: path.join(__dirname,"/server/app/static"),
		filename: 'bundle.js',
		publicPath: "/static/"
	},
	resolve: {
		extensions: ['', '.vue', '.js'],
		alias: {
			'vue$': 'vue/dist/vue.js' // 为使用vue的`template` 参考 https://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建
		}
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.js$/,
				loaders: ['babel-loader'],
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
		port: 7000,
	},

}