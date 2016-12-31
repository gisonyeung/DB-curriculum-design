<template>
	<div class="wrapper">
		<h1 class="page-title">发布课程</h1>
		<div class="data-box">
			<div class="row">
				<text-input
					labelName="课程名"
					elemId="className"
					defaultMsg="请填写课程名"
				></text-input>
			</div>
			<div class="row">
				<text-input
					labelName="开课单位"
					elemId="classUnit"
					defaultMsg="请填写开课单位"
				></text-input>
			</div>
			<div class="row">
				<button class="page-btn">确认发布</button>
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