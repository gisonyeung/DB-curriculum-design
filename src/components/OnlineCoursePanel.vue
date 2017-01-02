<template>
	<div class="wrapper transparent">
		<h1 class="page-title">在线选课{{ records.length ? '（' + records.length + '）' : '' }}</h1>
		<div class="content extend">
			<tip-record v-if="!records.length">{{ hasFirstRequestDone ? '暂无记录' : '正在请求中' }}</tip-record>
			<class-box
				v-for="item in records"
				:title="item.Cname"
				:unit="item.Cunit"
				:Tname="item.Tname"
				:num="item.num" 
				:status="item.Cstatus"
				:Cno="item.Cno"
				role="2"
				isSelect="true"
			></class-box>
		</div>

	</div>
</template>

<script>
	import Api from '../constant/Api'
	import fetch from '../utils/fetch'

	export default {
		data() {
			return {
				hasFirstRequestDone: false,
				records: [],
				tip: '正在请求中',
			}
		},
		created() {
			fetch(Api.onlineCourse)
			.then(data => {
				if ( data.result === 'success' ) {
					this.records = data.records;
					this.hasFirstRequestDone = true;
				}
				// 应该考虑 else 的情况
			})
			.catch(err => {
				this.hasFirstRequestDone = true;
				this.tip = '网络连接错误';
			});
		}

	}
</script>