<template>
	<div class="wrapper">
		<h1 class="page-title">发布课程</h1>
		<div class="data-box">
			<div class="row">
				<text-input
					labelName="课程名"
					elemId="className"
					defaultMsg="请填写课程名"
					:value="className"
					@update="className = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="开课单位"
					elemId="classUnit"
					defaultMsg="请填写开课单位"
					:value="classUnit"
					@update="classUnit = arguments[0]"
				></text-input>
			</div>
			<div class="row">
				<p 
					class="global-tip"
					v-if="tip.global"
				>{{tip.global}}</p>
				<button class="page-btn" @click="publish">确认发布</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../constant/Api';
	import fetch from '../utils/fetch';


	export default {
		created() {
			// console.log('1');
		},
		data() {
			return {
				requestLock: false,
				className: '',
				classUnit: '',
				tip: {
					global: '',
				}
			}
		},
		methods: {
			publish() {
				// 请求锁
				if ( this.requestLock ) {
					return false;
				}

				this.requestLock = true;
				fetch(Api.publishCourse, {
					courseName: this.className,
					courseUnit: this.classUnit,
				})
				.then(data => {
					this.requestLock = false;
					if ( data.result === 'success' ) {
						this.tip.global = '新增成功';
						this.clearForm();
					}
				})
				.catch(err => {
					this.requestLock = false;
					console.log(err);
				});
			},
			clearForm() {
				this.className = '';
				this.classUnit = '';
			},
		}
	}
</script>