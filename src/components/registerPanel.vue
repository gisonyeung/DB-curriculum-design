<template>
	<div class="wrapper">
		<h1 class="page-title">注册</h1>
		<div class="data-box">
			<div class="row">
				<text-input
					labelName="用户名"
					elemId="username"
					defaultMsg="请输入用户名"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="密码"
					type="password"
					elemId="password"
					defaultMsg="登录密码"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="学生姓名"
					elemId="nickname"
					defaultMsg="登录密码"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="学院"
					elemId="college"
					defaultMsg="登录密码"
				></text-input>
			</div>
			<div class="row">
				<button class="page-btn">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			// console.log('1');
		}
	}
</script>