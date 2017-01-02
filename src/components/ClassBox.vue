<template>
	<div class="c-box">
		<div class="c-status">
			<span :class="statusMap[status].class">{{ statusMap[status].text }}</span>
		</div>
		<h2 class="c-title">《<span :title="title">{{title}}</span>》</h2>
		<div class="c-info">
			<span class="college">{{unit}}</span>
			<span class="teacher">{{Tname}}</span>
		</div>
		<div class="c-people">
			已选<span class="num">{{num}}</span>人
		</div>
		<div class="c-handle">
			<p 
				class="item" 
				v-if="role == 1 && status == '1'"
				@click="startCourse"
			>
				<i class="icon icon-start"></i>
				<span>开课</span>
			</p>
			<p 
				class="item" 
				v-if="role == 1 && status == '1'"
				@click="closeCourse"
				title="关闭后此课程将不能评分"
			>
				<i class="icon icon-cancel"></i>
				<span>关闭课程</span>
			</p>
			<p 
				class="item" 
				v-if="role == 1 && status == '2'"
				@click="endCourse"
				title="结束后可进行评分"
			>
				<i class="icon icon-cancel"></i>
				<span>结束课程</span>
			</p>
			<p class="item" v-if="role == 1 && status == '3'">
				<i class="icon icon-edit"></i>
				<span>评分</span>
			</p>
			<p 
				class="item" 
				v-if="role == 2 && status == '1' && isSelect"
				@click="selectCourse"
			>
				<i class="icon icon-select"></i>
				<span>选课</span>
			</p>
			<p 
				class="item" v-if="role == 2 && status == '1' && !isSelect"
				@click="rejectCourse"
			>
				<i class="icon icon-cancel"></i>
				<span>退选</span>
			</p>
		</div>
	</div>
</template>

<script>
	import Api from '../constant/Api'
	import fetch from '../utils/fetch'

	export default {
		data: function() {
			return {
				statusMap: {
					'1': {
						text: '报名中',
						class: 'working'
					},
					'2': {
						text: '已开课',
						class: 'started'
					},
					'3': {
						text: '已结束',
						class: ''
					},
					'4': {
						text: '已关闭',
						class: ''
					},

				},
			}
		},
		props: ['title' ,'unit', 'Tname', 'num', 'status', 'role', 'Cno', 'isSelect'],
		methods: {
			startCourse() {
				this.changeCourseStatus(2);
			},
			endCourse() {
				this.changeCourseStatus(3);
			},
			closeCourse() {
				this.changeCourseStatus(4);
			},
			changeCourseStatus(statusCode) {
				fetch(Api.changeCourseStatus, {
					Cno: this.Cno,
					status: statusCode,
				})
				.then(data => {
					if ( data.result === 'success' ) {
						this.status = statusCode;
					}
					
				})
				.catch(err => {
					this.tip = '网络连接错误';
				});
			},
			selectCourse() {
				this.changeSelectStatus(true);
			},
			rejectCourse() {
				this.changeSelectStatus(false);
			},
			changeSelectStatus(isSelect) {
				fetch(Api.changeSelectStatus, {
					Cno: this.Cno,
					isSelect: isSelect,
				})
				.then(data => {
					if ( data.result === 'success' ) {
						this.isSelect = !data.status;
					} else {
						alert(data.reason);
						this.isSelect = !this.isSelect;
					}
					
				})
				.catch(err => {
					this.tip = '网络连接错误';
				});
			},
		}
	}
</script>