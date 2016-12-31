var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var pathToBourbon = require('node-bourbon').includePaths;

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
		extensions: ['', '.vue', '.js', '.scss'],
		alias: {
			'vue$': 'vue/dist/vue.js' // 为使用vue的`template` 参考 https://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建
		}
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader?includePaths[]=' + pathToBourbon,
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				loaders: ['vue-style!css!sass?includePaths[]=' + pathToBourbon, 'style!css!sass?includePaths[]=' + pathToBourbon],
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
	vue: {
		loaders: {
			scss: 'vue-style!css!sass?includePaths[]=' + pathToBourbon,
			exclude: /node_modules/,
		}
	},
	sassLoader: {
        includePaths: [pathToBourbon]
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