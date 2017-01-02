exports.setCookie = function(res, data) {

	res.cookie('username', data.username, { maxAge: 900000, httpOnly: false });
	res.cookie('role', data.role, { maxAge: 900000, httpOnly: false });
	res.cookie('id', data.id, { maxAge: 900000, httpOnly: false });
	res.cookie('nickname', data.nickname, { maxAge: 900000, httpOnly: false });

}

exports.clearCookie = function(res) {

	res.clearCookie('username');
	res.clearCookie('role');
	res.clearCookie('id');
	res.clearCookie('nickname');

}

exports.getCookie = function(req) {
	return req.cookies;
}

