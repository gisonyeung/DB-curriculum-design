var _ = require('lodash');
var connection = require('../sqlconnect');

// 角色等级
var role = require('../constant/role');

var checkSession = require('../utils/checkSession');
var errorHandler = require('../utils/errorHandler');
var successHandler = require('../utils/successHandler');
var formCheck = require('../utils/formCheck');
var usercookie = require('../utils/usercookie');





/*
	学生注册
*/
exports.registerStudent = function(req, res) {

	var form = req.body;

	// 表单验证
	if ( formCheck.username(form.username).error ) {
		return errorHandler(res, formCheck.username(form.username).error);
	} else if ( formCheck.password(form.password).error ) {
		return errorHandler(res, formCheck.password(form.password).error);
	} else if ( formCheck.nickname(form.nickname).error ) {
		return errorHandler(res, formCheck.nickname(form.nickname).error);
	} else if ( formCheck.college(form.college).error ) {
		return errorHandler(res, formCheck.college(form.college).error);
	} else if ( formCheck.sex(form.sex).error ) {
		return errorHandler(res, formCheck.sex(form.sex).error);
	} else if ( formCheck.age(form.age).error ) {
		return errorHandler(res, formCheck.age(form.age).error);
	}

	// username 唯一
	connection.query(
		'SELECT username FROM user where username = ?', 
		[form.username], 
		function(err, rows) {
			if (err) {
				return errorHandler(res, '数据库错误：' + err);
			}

			if ( rows.length ) {
				return errorHandler(res, '当前用户名已经存在');
			}

			try {
				// user表 新增记录
				connection.query(
					'INSERT INTO user(username, password, role) VALUES(?,?,?)',
					[form.username, form.password, role.student],
					function(err, result) {
						if (err) {
							return errorHandler(res, '注册失败：' + err);
						}

						// student表 新增记录
						connection.query(
							'INSERT INTO student(Sname, Ssex, Sage, Scollege, username) VALUES(?,?,?,?,?)',
							[form.nickname, form.sex, form.age, form.college, form.username],
							function(err, result) {
								if (err) {
									// 删除user表中刚刚新增的那条记录
									connection.query(
										'DELETE FROM user WHERE username = ?',
										[form.username],
										function(err1) {
											if (err1) {
												console.log('[database error] 注册失败时删除user表记录不成功 username: ' + form.username);
											}
											return errorHandler(res, '注册失败：' + err);
										}
									);
								}

								return successHandler(res, {
									Sno: result.insertId,
								});
							}
						);

					}
				);
				
			} catch(e) {
				// 删除user表中刚刚新增的那条记录
				connection.query(
					'DELETE FROM user WHERE username = ?',
					[form.username],
					function(err1) {
						if (err1) {
							console.log('[database error] 注册失败时删除user表记录不成功 username: ' + form.username);
						}
						console.log('存储信息时发生错误: ' + e);
						return errorHandler(res, '注册失败，存储学生信息时发生错误');
					}
				);
			}

		}
	);

	// 

};


/*
	教师注册
*/
exports.registerTeacher = function(req, res) {

	var form = req.body;

	// 表单验证
	if ( formCheck.username(form.username).error ) {
		return errorHandler(res, formCheck.username(form.username).error);
	} else if ( formCheck.password(form.password).error ) {
		return errorHandler(res, formCheck.password(form.password).error);
	} else if ( formCheck.nickname(form.nickname).error ) {
		return errorHandler(res, formCheck.nickname(form.nickname).error);
	} else if ( formCheck.sex(form.sex).error ) {
		return errorHandler(res, formCheck.sex(form.sex).error);
	} else if ( formCheck.age(form.age).error ) {
		return errorHandler(res, formCheck.age(form.age).error);
	} else if ( formCheck.degree(form.degree).error ) {
		return errorHandler(res, formCheck.degree(form.degree).error);
	} else if ( formCheck.protitle(form.protitle).error ) {
		return errorHandler(res, formCheck.protitle(form.protitle).error);
	} else if ( formCheck.health(form.health).error ) {
		return errorHandler(res, formCheck.health(form.health).error);
	}

	// "undefined" 则转成 空字符串
	form.protitle = form.protitle === 'undefined' ? '' : form.protitle;

	// username 唯一
	connection.query(
		'SELECT username FROM user where username = ?', 
		[form.username], 
		function(err, rows) {
			if (err) {
				return errorHandler(res, '数据库错误：' + err);
			}

			if ( rows.length ) {
				return errorHandler(res, '当前用户名已经存在');
			}

			// user表 新增记录
			connection.query(
				'INSERT INTO user(username, password, role) VALUES(?,?,?)',
				[form.username, form.password, role.teacher],
				function(err, result) {
					if (err) {
						return errorHandler(res, '注册失败：' + err);
					}
					try {
						// teacher表 新增记录
						connection.query(
							'INSERT INTO teacher(Tname, Tsex, Tage, Tdegree, Tprotitle, Tschool, Thealth, username) VALUES(?,?,?,?,?,?,?,?)',
							[form.nickname, form.sex, form.age, form.degree, form.protitle, form.school, form.health, form.username],
							function(err, result) {
								if (err) {
									// 删除user表中刚刚新增的那条记录
									connection.query(
										'DELETE FROM user WHERE username = ?',
										[form.username],
										function(err1) {
											if (err1) {
												console.log('[database error] 注册失败时删除user表记录不成功 username: ' + form.username);
											}
											return errorHandler(res, '注册失败：' + err);
										}
									);
								}

								return successHandler(res, {
									Tno: result.insertId,
								});
							}
						);
						
					} catch (e) {
						// 删除user表中刚刚新增的那条记录
						connection.query(
							'DELETE FROM user WHERE username = ?',
							[form.username],
							function(err1) {
								if (err1) {
									console.log('[database error] 注册失败时删除user表记录不成功 username: ' + form.username);
								}
								console.log('存储信息时发生错误: ' + e);
								return errorHandler(res, '注册失败，存储教师信息时发生错误');
							}
						);
					}


				}
			);
		}
	);

	// 

};


exports.login = function(req, res) {
	var form = req.body;

	// 表单验证
	if ( formCheck.username(form.username).error ) {
		return errorHandler(res, formCheck.username(form.username).error);
	} else if ( formCheck.password(form.password).error ) {
		return errorHandler(res, formCheck.password(form.password).error);
	}

	//　查询 user 表，验证用户名与密码
	connection.query(
		'SELECT * FROM user where username = ?', 
		[form.username], 
		function(err, rows) {
			if (err) {
				return errorHandler(res, '数据库错误：' + err);
			}

			if ( !rows.length ) {
				return errorHandler(res, '用户名不存在');
			}

			var _user = rows[0];

			if ( _user.password !== form.password ) {
				return errorHandler(res, '密码错误');
			}

			// 判断查询学生表还是教师表
			if ( _user.role == role.teacher ) {
				query = 'SELECT * FROM teacher where username = ?'
			} else {
				query = 'SELECT * FROM student where username = ?';
			}

			// 获取个人资料，可能是教师，也可能是学生
			connection.query(
				query,
				[_user.username],
				function(err, rows) {
					if (err) {
						console.log('获取用户信息失败：' + err);
						return errorHandler(res, '获取个人信息失败，请重试');
					}

					if ( !rows.length ) {
						return errorHandler(res, '当前用户非在校人员，登录失败');
					}

					// 设置 cookie
					usercookie.setCookie(res, {
						username: _user.username,
						role: _user.role,
						id: rows[0].Tno || rows[0].Sno,
						nickname: rows[0].Tname || rows[0].Sname,
					});

					var resJSON = _.assignIn({ role: _user.role }, rows[0]);
					return successHandler(res, resJSON);

				}
			);

		}
	);
}

exports.logout = function(req, res) {

	usercookie.clearCookie(res);
	return successHandler(res);

}

