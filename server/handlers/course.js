var _ = require('lodash');
var connection = require('../sqlconnect');

// 角色等级
var role = require('../constant/role');

var errorHandler = require('../utils/errorHandler');
var successHandler = require('../utils/successHandler');
var formCheck = require('../utils/formCheck');
var usercookie = require('../utils/usercookie');




/*
	发布课程
*/
exports.publishCourse = function(req, res) {

	var courseName = req.body.courseName;
	var courseUnit = req.body.courseUnit;

	if ( formCheck.isNull(courseName) ) {
		return errorHandler(res, '课程名不能为空');
	} else if ( formCheck.isNull(courseUnit) ) {
		return errorHandler(res, '开课单位不能为空');
	}

	var _Tno = req.cookies.id;

	if ( formCheck.isNull(_Tno) ) {
		return errorHandler(res, '你没有权限');
	}

	// 同一个老师同时只能开一门相同的课
	connection.query(
		'SELECT Cname,Cstatus FROM course where Tno = ?', 
		[_Tno], 
		function(err, rows) {
			if (err) {
				return errorHandler(res, '数据库错误：' + err);
			}

			var hasCourse = false;
			_.each(rows, function(row) {
				if (row.Cname === courseName && row.Cstatus < 3) {
					hasCourse = true;
				}
			});

			if ( hasCourse ) {
				return errorHandler(res, '你当前尚未结束的课程已经包含此课程');
			}

			// 当前老师无相同的课程，则允许新增
			connection.query(
				'INSERT INTO course(Cname, Tno, Cunit, Cstatus) VALUES(?,?,?,1)',
				[courseName, _Tno, courseUnit],
				function(err, result) {
					if (err) {
						return errorHandler(res, '发布课程失败：' + err);
					}

					return successHandler(res);
				}
			);
		}
	);

};


/*
	获取教师发布课程
*/
exports.teacherCourse = function(req, res) {

	var form = usercookie.getCookie(req);

	if ( !form.id || form.role != role.teacher ) {
		return errorHandler(res, '你没有权限');
	}



	connection.query(
		'SELECT course.Cno, Cname, course.Tno, Cunit, Cstatus, Tname ' +
		'FROM course, teacher '+
		'WHERE course.Tno = ? and course.Tno = teacher.Tno ',
		[form.id], 
		function(err, rows) {
			if (err) {
				console.log(err);
				return errorHandler(res, '数据库错误：' + err);
			}

			var promiseList = [];

			// 查询 student_course 表，选课人数
			_.each(rows, function(record) {
				var _promise = new Promise(function(resolve, reject) {
					connection.query(
						'SELECT count(Sno) AS num FROM student_course WHERE Cno = ' + record.Cno,
						function(err, num) {
							if (err) {
								reject(err);
							}

							resolve(num[0].num);
						}
					)
				});
				promiseList.push(_promise);
			});

			Promise
			.all(promiseList)
			.then(numsArray => {
				_.each(rows, function(row, index) {
					row.num = numsArray[index];
				});

				return successHandler(res, {
					records: rows
				});

			})
			.catch(err => errorHandler(res, err));
			
		}
	);

};


/*
	教师修改课程状态
*/
exports.changeCourseStatus = function(req, res) {

	var form = _.assign(usercookie.getCookie(req), req.body);

	if ( !form.id || form.role != role.teacher ) {
		return errorHandler(res, '你没有权限');
	}

	connection.query(
		'UPDATE course SET Cstatus = ? WHERE Cno = ?',
		[form.status, form.Cno], 
		function(err, rows) {
			if (err) {
				console.log(err);
				return errorHandler(res, '数据库错误：' + err);
			}

			return successHandler(res);
		}
	);

};

/*
	在线选课
*/
exports.onlineCourse = function(req, res) {

	connection.query(
		'SELECT course.Cno, Cname, course.Tno, Cunit, Cstatus, Tname ' +
		'FROM course, teacher '+
		'WHERE course.Cstatus < 2 and course.Tno = teacher.Tno ', 
		function(err, rows) {
			if (err) {
				console.log(err);
				return errorHandler(res, '数据库错误：' + err);
			}

			var promiseList = [];

			// 查询 student_course 表，选课人数
			_.each(rows, function(record) {
				var _promise = new Promise(function(resolve, reject) {
					connection.query(
						'SELECT count(Sno) AS num FROM student_course WHERE Cno = ' + record.Cno,
						function(err, num) {
							if (err) {
								reject(err);
							}

							resolve(num[0].num);
						}
					)
				});
				promiseList.push(_promise);
			});

			Promise
			.all(promiseList)
			.then(numsArray => {
				_.each(rows, function(row, index) {
					row.num = numsArray[index];
				});

				return successHandler(res, {
					records: rows
				});

			})
			.catch(err => errorHandler(res, err));
			
		}
	);

};

/*
	选课
*/
exports.changeSelectStatus = function(req, res) {

	var form = _.assign(usercookie.getCookie(req), req.body);

	// 选课
	if (form.isSelect) {
		connection.query(
			'SELECT * FROM student_course WHERE Cno = ? and Sno = ?',
			[form.Cno, form.id], 
			function(err, rows) {
				if (err) {
					console.log(err);
					return errorHandler(res, '数据库错误：' + err);
				}

				if ( rows.length ) {
					return errorHandler(res, '选课失败，你当前选择此课程');
				}

				connection.query(
					'INSERT INTO student_course(Cno, Sno, Sname, Sscore) VALUES(?,?,?,null)',
					[form.Cno, form.id, form.nickname],
					function(err, result) {
						if (err) {
							console.log(err);
							return errorHandler(res, '数据库错误：' + err);
						}

						return successHandler(res, {
							status: true
						});
					}
				);

			}
		);
		
	} else { // 退选
		connection.query(
			'DELETE FROM student_course WHERE Cno = ? and Sno = ?',
			[form.Cno, form.id], 
			function(err, result) {
				if (err) {
					console.log(err);
					return errorHandler(res, '数据库错误：' + err);
				}
				return successHandler(res, {
					status: false
				});
			}
		);
	}


};

/*
	已选课程
*/
exports.hasSelectCourse = function(req, res) {

	var form = _.assign(usercookie.getCookie(req), req.body);

	connection.query(
		'SELECT course.Cno, Cname, course.Tno, Cunit, Cstatus, Tname ' +
		'FROM course, teacher '+
		'WHERE course.Sno = ? and course.Tno = teacher.Tno ', 
		[form.id],
		function(err, rows) {
			if (err) {
				console.log(err);
				return errorHandler(res, '数据库错误：' + err);
			}

			var promiseList = [];

			// 查询 student_course 表，选课人数
			_.each(rows, function(record) {
				var _promise = new Promise(function(resolve, reject) {
					connection.query(
						'SELECT count(Sno) AS num FROM student_course WHERE Cno = ' + record.Cno,
						function(err, num) {
							if (err) {
								reject(err);
							}

							resolve(num[0].num);
						}
					)
				});
				promiseList.push(_promise);
			});

			Promise
			.all(promiseList)
			.then(numsArray => {
				_.each(rows, function(row, index) {
					row.num = numsArray[index];
				});

				return successHandler(res, {
					records: rows
				});

			})
			.catch(err => errorHandler(res, err));
			
		}
	);

};