var _ = require('lodash');

exports.isLogin = function() {
	var cookies = document.cookie.split(';');

	if ( !cookies.length ) {
		return false;
	}

	var hasUsername = false,
		hasRole = false,
		hasId = false,
		hasNickname = false;

	_.each(cookies, function(item) {
		if ( /username=/.test(item) ) {
			hasUsername = true;
		} else if ( /role=/.test(item) ) {
			hasRole = true;
		} else if ( /id=/.test(item) ) {
			hasId = true;
		} else if ( /nickname=/.test(item) ) {
			hasNickname = true;
		}
	});

	return hasUsername && hasRole && hasId && hasNickname;
}

exports.getUserdataFromCookie = function() {
	var cookies = document.cookie.split(';');

	var data = {};

	_.each(cookies, function(item) {

		var results = /([\w]+)=([^\s]+)/.exec(item);

		data[results[1]] = results[2];

	});

	data.nickname = decodeURIComponent(data.nickname);

	return data;
};
