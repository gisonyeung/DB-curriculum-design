<template>
	<div class="wrapper">
		<h1 class="page-title">
			注册（教师）
			<router-link to="/register/student">学生注册</router-link>
		</h1>
		<div class="data-box">
			<div class="row">
				<text-input
					labelName="用户名"
					elemId="username"
					defaultMsg="登录用户名，数字、字母、下划线组成，不超过25个字符"
					:value="form.username"
					@update="form.username = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="密码"
					type="password"
					elemId="password"
					defaultMsg="登录密码，不超过25个字符"
					:value="form.password"
					@update="form.password = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="确认密码"
					type="password"
					elemId="repassword"
					defaultMsg="登录密码"
					:value="form.repassword"
					@update="form.repassword = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="教师姓名"
					elemId="nickname"
					defaultMsg="教师姓名"
					:value="form.nickname"
					@update="form.nickname = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<select-input
					labelName="性别"
					elemId="sex"
					defaultMsg="性别"
					:value="form.sex"
					@update="form.sex = arguments[0]"
				>
					<option value="男">男</option>
					<option value="女">女</option>
				</select-input>
			</div>
			<div class="row">
				<text-input
					labelName="年龄"
					elemId="age"
					type="number"
					defaultMsg="数字"
					:value="form.age"
					@update="form.age = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<select-input
					labelName="最高学历"
					elemId="degree"
					:value="form.degree"
					@update="form.degree = arguments[0]"
				>
					<option value="本科">本科</option>
					<option value="硕士">硕士</option>
					<option value="博士">博士</option>
				</select-input>
			</div>
			<div class="row">
				<text-input
					labelName="毕业学校"
					elemId="school"
					defaultMsg="学校名称"
					:value="form.school"
					@update="form.school = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<select-input
					labelName="健康状况"
					elemId="health"
					:value="form.health"
					@update="form.health = arguments[0]"
				>
					<option value="健康">健康</option>
					<option value="一般">一般</option>
					<option value="不健康">不健康</option>
				</select-input>
			</div>
			<div class="row">
				<text-input
					labelName="职称"
					elemId="protitle"
					defaultMsg="选填"
					:value="form.protitle"
					@update="form.protitle = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<p 
					class="global-tip"
					v-if="tip.global"
				>{{tip.global}}</p>
				<button class="page-btn" @click="register">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../constant/Api';
	import fetch from '../utils/fetch';
	var formCheck = require('../utils/formCheck');

	export default {
		data() {
			return {
				requestLock: false,
				form: {
					username: '',
					password: '',
					repassword: '',
					nickname: '',
					sex: '',
					age: '',
					protitle: '',
					school: '',
					health: '',
				},
				tip: {
					global: '',
				},
			}
		},
		methods: {
			register() {
				// 表单验证
				if ( formCheck.username(this.form.username).error ) {
					this.tip.global = formCheck.username(this.form.username).error;
					return false;
				} else if ( formCheck.password(this.form.password).error ) {
					this.tip.global = formCheck.password(this.form.password).error;
					return false;
				} else if ( this.form.password !== this.form.repassword ) {
					this.tip.global = '两次密码不一致';
					return false;
				} else if ( formCheck.nickname(this.form.nickname).error ) {
					this.tip.global = formCheck.nickname(this.form.nickname).error;
					return false;
				} else if ( formCheck.sex(this.form.sex).error ) {
					this.tip.global = formCheck.sex(this.form.sex).error;
					return false;
				} else if ( formCheck.age(this.form.age).error ) {
					this.tip.global = formCheck.age(this.form.age).error;
					return false;
				} else if ( formCheck.degree(this.form.degree).error ) {
					this.tip.global = formCheck.degree(this.form.degree).error;
					return false;
				} else if ( formCheck.school(this.form.school).error ) {
					this.tip.global = formCheck.school(this.form.school).error;
					return false;
				} else if ( formCheck.health(this.form.health).error ) {
					this.tip.global = formCheck.health(this.form.health).error;
					return false;
				} else if ( formCheck.protitle(this.form.protitle).error ) {
					this.tip.global = formCheck.protitle(this.form.protitle).error;
					return false;
				}
				
				this.tip.global = '';
				this.sendRequest();
			},
			sendRequest() {
				// 请求锁
				if ( this.requestLock ) {
					this.tip.global = '请不要重复提交请求';
					return false;
				}
				this.requestLock = true;
				fetch(Api.registerTeacher, {
					username: this.form.username,
					password: this.form.password,
					nickname: this.form.nickname,
					sex: this.form.sex,
					age: this.form.age,
					protitle: this.form.protitle,
					degree: this.form.degree,
					school: this.form.school,
					health: this.form.health,
				})
				.then(data => {
					this.requestLock = false;
					if ( data.result === 'success' ) {
						this.tip.global = '';
						alert('注册成功！\n您的教师号: ' + data.Tno + '\n登录帐号：' + this.form.username);
						this.clearForm();
					} else {
						this.tip.global = data.reason;
					}
				})
				.catch(err => {
					this.tip.global = '网络连接错误';
					this.requestLock = false;
				});
			},
			clearForm() {
				this.form.username = '';
				this.form.password = '';
				this.form.repassword = '';
				this.form.nickname = '';
				this.form.age = '';
				this.form.sex = '';
				this.form.protitle = '';
				this.form.school = '';
				this.form.degree = '';
				this.form.health = '';
			},
		}
	}
</script>