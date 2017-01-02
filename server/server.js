
var express = require('express');
var app = express();
var PORT = 7000;

/* dev */
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var compiler = webpack(config);
/* dev end*/

// 静态文件路径
app.use(express.static(__dirname + '/app'));

/* dev */
app.use(webpackDevMiddleware(compiler, { 
	noInfo: true, 
	publicPath: config.output.publicPath,
	hot: true,
	stats: { colors: true } ,
}));
app.use(webpackHotMiddleware(compiler));
/* dev end*/

// 修改请求体大小限制（默认的会比较小）
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 不使用模板，直接渲染文件
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// 认证相关的文件
var credentials = require('./credentials.js');

// cookie
app.use(require('cookie-parser')(credentials.cookieSecret));


var usercookie = require('./utils/usercookie');
/* 中间件 */
app.use(function(req, res, next) {
	// 如果cookies有user信息，把它传到上下文中
	if (req.cookies.username !== 'undefined' && req.cookies.username) {
		res.locals.username = req.cookies.username;
		res.locals.role = req.cookies.role;
		// 更新cookie时长
		usercookie.setCookie(res, req.cookies);
	} else {
		usercookie.clearCookie(res);
	}
	next();
});
/* 中间件 end */


// 路由
require('./routes.js')(app);



// 启动服务器
app.listen(PORT, function(err) {
	if ( err ) {
		console.log('服务器启动失败：', err);
	}

	console.log('The server is running on http://localhost:' + PORT + '/');
});
