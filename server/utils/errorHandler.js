module.exports = function(res, msg) {
	return res.json({
		result: 'error',
		reason: msg
	});
}