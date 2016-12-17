var path = require('path');

module.exports = function(app) {
	/*
		History fallback
	*/
	app.get('*', function(req, res) {
		res.render(path.join(__dirname + '/app/entry.html'));
	});
}