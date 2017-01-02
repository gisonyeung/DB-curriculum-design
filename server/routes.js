var path = require('path');
var course = require('./handlers/course');
var user = require('./handlers/user');

module.exports = function(app) {
	/*
		History fallback
	*/
	app.get('*', function(req, res) {
		res.render(path.join(__dirname + '/app/entry.html'));
	});







	/*
		学生注册
	*/
	app.post('/registerStudent', user.registerStudent);

	/*
		教师注册
	*/
	app.post('/registerTeacher', user.registerTeacher);

	/*
		登录
	*/
	app.post('/login', user.login);

	/*
		注销
	*/
	app.post('/logout', user.logout);









	/*
		新增课程
	*/
	app.post('/publishCourse', course.publishCourse);

	/*
		查看发布的课程
	*/
	app.post('/teacherCourse', course.teacherCourse);

	/*
		修改课程状态
	*/
	app.post('/changeCourseStatus', course.changeCourseStatus);

	/*
		在线选课
	*/
	app.post('/onlineCourse', course.onlineCourse);

	
	/*
		选课退课
	*/
	app.post('/changeSelectStatus', course.changeSelectStatus);

	/*
		已选课程
	*/
	app.post('/hasSelectCourse', course.hasSelectCourse);










}