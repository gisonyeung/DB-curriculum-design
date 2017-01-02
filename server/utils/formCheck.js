var _ = require('lodash');

exports.isNull = function(str) {
	return str === 'undefined' || !str; 
}

exports.username = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '用户名不能为空'
		};
	} else if ( /[^\w\d]/.test(str) ) { // 非法字符
		return {
			error: '用户名由数字、字母和下划线组成'
		}
	} else if ( str.length > 25 ) { // 长度大于25
		return {
			error: '用户名长度不能大于25个字符'
		}
	}

	return {};
}

exports.password = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '密码不能为空'
		};
	} else if ( str.length > 25 ) { // 长度大于25
		return {
			error: '密码长度不能大于25个字符'
		}
	}

	return  {};
}


exports.age = function(age) {

	age = parseInt(age, 10);

	if ( !_.isNumber(age) ) { // 不是数字
		return {
			error: '年龄请输入合法数字'
		};
	} else if ( age < 0 || age > 120 ) { // 年龄不能小于0大于120
		return {
			error: '请输入合理年龄范围'
		}
	} else if ( age === 'undefined' || !age ) {
		return {
			error: '年龄不能为空'
		}
	}

	return  {};
}

exports.college = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '学院不能为空'
		};
	} else if ( str.length > 20 ) { // 学院长度不能大于20个字符
		return {
			error: '学院长度不能大于20个字符'
		}
	}

	return {};
}

exports.nickname = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '姓名不能为空'
		};
	} else if ( str.length > 12 ) { // 不能大于12个字符
		return {
			error: '姓名长度不能大于12个字符'
		}
	}

	return {};
}

exports.sex = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '性别不能为空'
		};
	} else if ( str !== '男' && str !== '女') { // 非法值
		return {
			error: '性别只能为"男"或"女"'
		}
	}

	return {};
}

exports.degree = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '最高学历不能为空'
		};
	} else if ( str !== '本科' && str !== '硕士' && str !== '博士') { // 非法值
		return {
			error: '最高学历值非法'
		}
	}

	return {};
}

exports.protitle = function(str) {

	if ( str === 'undefined' ) {
		return {
			error: '职称不合法'
		}
	}

	if ( str && str.length > 20 ) { // 不为空则检验长度是否合法
		return {
			error: '职称不能超过20个字符'
		};
	}

	return {};
}

exports.school = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '毕业学校不能为空'
		};
	} else if ( str.length > 20 ) { // 非法值
		return {
			error: '毕业学校长度不能超过20个字符'
		}
	}

	return {};

}

exports.health = function(str) {

	if ( str === 'undefined' || !str ) { // 为空
		return {
			error: '健康状况不能为空'
		};
	} else if ( str !== '健康' && str !== '一般' && str !== '不健康') { // 非法值
		return {
			error: '健康状况值非法'
		}
	}

	return {};
}















