<template>
	<div id="header">
		<div class="brand">
			<router-link to="/" title="网上选课系统">网上选课系统</router-link>
		</div>
		<nav class="nav action-list">
			<template v-if="userdata.role == 1">
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
			</template>
			<template v-if="userdata.role == 2">
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
			</template>

		</nav>
		<ul class="user-handle action-list">

			<template v-if="!isLogin">
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
			</template>

			<template v-if="isLogin">
				<li v-if="userdata.role == 1">
					<a href="javascript:;" class="action-item disabled" :title="'教师：' + userdata.nickname">
						<i class="icon icon-teacher"></i>
						{{userdata.nickname}}
					</a>
				</li>
				<li v-if="userdata.role == 2">
					<a href="javascript:;" class="action-item disabled" :title="'学生：' + userdata.nickname">
						<i class="icon icon-student"></i>
						{{userdata.nickname}}
					</a>
				</li>
				<li>
					<a href="javascript:;" class="action-item" title="登出系统" @click="logout">
						<i class="icon icon-logout"></i>
						注销
					</a>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import Api from '../constant/Api';
	import fetch from '../utils/fetch';
	var auth = require('../utils/auth');

	export default {
		data() {
			return {
				isLogin: false,
				userdata: {
					nickname: '',
					role: 0,
					username: '',
					id: '',
				},
			}
		},
		created() {
			if ( auth.isLogin() ) {
				console.log('已登录');
				this.setUserdata(auth.getUserdataFromCookie());
			}
			this.togglePanel();
		},
		methods: {
			updateLoginStatus(data) {
				console.log('登录状态改变');
				// 登录
				if ( data.username ) { // 修改用户资料
					this.setUserdata({
						nickname: data.Tname || data.Sname,
						role: data.role,
						username: data.username,
						id: data.Tno || data.Sno
					});
				} else {
					this.clearUserdata();
				}

				this.togglePanel();

			},
			logout() {
				fetch(Api.logout)
				.then(data => {
					if ( data.result === 'success' ) {
						this.isLogin = false;
						this.clearUserdata();
						window.router.push('/login');
					}
				})
				.catch(err => {
					this.tip.global = '网络连接错误';
				});
			},
			setUserdata(data) {
				this.isLogin = true;
				this.userdata.nickname = data.nickname || '';
				this.userdata.role = data.role || 0;
				this.userdata.username = data.username || '';
				this.userdata.id = data.id || 0;
			},
			clearUserdata() {
				this.userdata.nickname = '';
				this.userdata.role = 0;
				this.userdata.username = '';
				this.userdata.id = '';
			},
			togglePanel() {
				switch(this.userdata.role) {
					case 0: // 未登录

						break;
					case 1:
						window.router.push('/publish');
						break;
					case 2:
						window.router.push('/course');
						break;
				}
			},
		}
	}
</script>

<style lang="sass" src="../sass/Userbar.scss"></style>
