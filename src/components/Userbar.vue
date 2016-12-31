<template>
	<div id="header">
		<div class="brand">
			<router-link to="/" title="网上选课系统">网上选课系统</router-link>
		</div>
		<nav class="nav action-list">
			<router-link 
				to="/publish" 
				class="action-item" 
				title="发布课程" 
				exact
			>
				<i class="icon icon-publish"></i>
				发布课程
			</router-link>
			<router-link 
				to="/teacherClass" 
				class="action-item" 
				title="查看当前已发布课程情况" 
				exact
			>
				<i class="icon icon-book"></i>
				已发布课程
			</router-link>
			<router-link
				to="/mark" 
				class="action-item" 
				title="给学生进行课程评分"
				exact
			>
				<i class="icon icon-score"></i>
				课程评分
			</router-link>
			<router-link
				to="/course" 
				class="action-item" 
				title="在线选课"
				exact
			>
				<i class="icon icon-book"></i>
				在线选课
			</router-link>
			<router-link
				to="/mycourse" 
				class="action-item" 
				title="查看已选课程"
				exact
			>
				<i class="icon icon-book"></i>
				已选课程
			</router-link>

		</nav>
		<ul class="user-handle action-list">
			<li>
				<router-link to="/login" class="action-item" title="登录">
					<i class="icon icon-face"></i>
					登录
				</router-link>
			</li>
			<li>
				<router-link to="/register" class="action-item" title="注册">
					<i class="icon icon-register"></i>
					注册
				</router-link>
			</li>
			<li>
				<a href="javascript:;" class="action-item disabled" title="教师：路璐">
					<i class="icon icon-teacher"></i>
					路璐
				</a>
			</li>
			<li>
				<a href="javascript:;" class="action-item disabled" title="学生：杨子聪">
					<i class="icon icon-student"></i>
					杨子聪
				</a>
			</li>
			<li>
				<a href="javascript:;" class="action-item" title="登出系统">
					<i class="icon icon-logout"></i>
					注销
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		created() {
			// console.log('1');
		}
	}
</script>

<style lang="sass" src="../sass/Userbar.scss"></style>
