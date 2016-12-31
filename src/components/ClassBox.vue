<template>
	<div class="c-box">
		<div class="c-status">
			<span :class="statusMap[status].class">{{ statusMap[status].text }}</span>
		</div>
		<h2 class="c-title">《<span :title="title">{{title}}</span>》</h2>
		<div class="c-info">
			<span class="college">{{unit}}</span>
			<span class="teacher">{{tName}}</span>
		</div>
		<div class="c-people">
			已选<span class="num">{{num}}</span>人
		</div>
		<div class="c-handle">
			<p class="item" v-if="role == 1 && status == '1'">
				<i class="icon icon-start"></i>
				<span>开课</span>
			</p>
			<p class="item" v-if="role == 1 && status == '1'">
				<i class="icon icon-cancel"></i>
				<span>关闭课程</span>
			</p>
			<p class="item" v-if="role == 1 && status == '2'">
				<i class="icon icon-cancel"></i>
				<span>结束课程</span>
			</p>
			<p class="item" v-if="role == 1 && status == '3'">
				<i class="icon icon-edit"></i>
				<span>评分</span>
			</p>
			<p class="item" v-if="role == 2 && status == '1'">
				<i class="icon icon-select"></i>
				<span>选课</span>
			</p>
			<p class="item" v-if="role == 2 && status == '1'">
				<i class="icon icon-cancel"></i>
				<span>退选</span>
			</p>
		</div>
	</div>
</template>

<script>
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
		props: ['title' ,'unit', 'tName', 'num', 'status', 'role'],
	}
</script>