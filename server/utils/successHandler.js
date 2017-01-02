var _ = require('lodash');

module.exports = function(res, data) {

	data = _.isObject(data) ? data : {};

	return res.json( _.assignIn({ result: 'success' }, data) );
}