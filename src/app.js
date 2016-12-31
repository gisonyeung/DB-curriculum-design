import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import routes from './routes'

require('./global/components');

const router = new VueRouter({
	mode: 'history',
	routes: routes
});

new Vue({
	router,
	el: '#app',
})