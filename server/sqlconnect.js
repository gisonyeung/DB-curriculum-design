var mysql = require('mysql');
var connection = mysql.createConnection({
	hose: 'localhose',
	user: 'root',
	password: '123456',
	database: 'course_system'
})
connection.connect(function(err) {
	if (err) {
		console.error('[error database connecting] ' + err.stack);
		return;
	}

	console.log('[database conected] as id: ' + connection.threadId);
});

// connection.query('SELECT * from teacher', function(err, rows) {
// 	if (err) {
// 		console.log('[query error] ' + err);
// 	}
	
// 	console.log(rows);
//   // connected! (unless `err` is set) 
// });

module.exports = connection;