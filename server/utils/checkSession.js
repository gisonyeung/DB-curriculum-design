module.exports = function(req, role, username) {
	if ( !req.session.user ) {
		return false;
	}

	var checkUsername = true;

	if ( username ) {
		checkUsername = (username == req.session.user.username);
	}

	return req.session.user.role == role && checkUsername;
}