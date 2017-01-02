<template>
	<div class="wrapper">
		<h1 class="page-title">登陆</h1>
		<div class="data-box">
			<div class="row">
				<text-input
					labelName="用户名"
					elemId="username"
					defaultMsg="请输入用户名"
					:value="form.username"
					@update="form.username = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="密码"
					type="password"
					elemId="password"
					defaultMsg="登录密码"
					:value="form.password"
					@update="form.password = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<p 
					class="global-tip"
					v-if="tip.global"
				>{{tip.global}}</p>
				<button class="page-btn" @click="login">登录</button>
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
				},
				tip: {
					global: '',
				},
			}
		},
		methods: {
			login() {
				// 表单验证
				if ( formCheck.username(this.form.username).error ) {
					this.tip.global = formCheck.username(this.form.username).error;
					return false;
				} else if ( formCheck.password(this.form.password).error ) {
					this.tip.global = formCheck.password(this.form.password).error;
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
				fetch(Api.login, {
					username: this.form.username,
					password: this.form.password,
				})
				.then(data => {
					this.requestLock = false;
					if ( data.result === 'success' ) {
						// 传递登录事件
						this.$emit('loginChange', data);
						this.tip.global = '';
						this.clearForm();
					} else {
						this.tip.global = data.reason;
					}
				})
				.catch(err => {
					console.log(err);
					this.tip.global = '网络连接错误';
					this.requestLock = false;
				});
			},
			clearForm() {
				this.form.username = '';
				this.form.password = '';
			},
		}
	}
</script>