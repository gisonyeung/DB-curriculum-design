import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import routes from './routes'

require('./global/components');

window.router = new VueRouter({
	mode: 'history',
	routes: routes
});


var auth = require('./utils/auth');
// 简单判断用户是否登录
router.beforeEach((to, from, next) => {

	if (to.meta.requireAuth) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if ( !auth.isLogin() ) {
			next({
				path: '/login'
			})
		} else {
			next();
		}
	} else {
		next(); // 确保一定要调用 next()
	}
})



new Vue({
	router,
	el: '#app',
})