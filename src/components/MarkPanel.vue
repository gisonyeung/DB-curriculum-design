<template>
	<div class="wrapper">
		<h1 class="page-title">课程评分</h1>
		<div class="content">
			<div class="course-info">
				课程编号：
				<span>2</span>
			</div>
			<div class="course-info">
				课程名称：
				<span>数据库系统</span>
			</div>
			<div class="course-info">
				教师名称：
				<span>路璐</span>
			</div>
			<div class="course-info">
				已评人数：
				<span>0 / 10</span>
			</div>
			<div class="m-header">
				<div class="row">
					<p class="col col-2">学号</p>
					<p class="col col-3">学生姓名</p>
					<p class="col col-3">学院</p>
					<p class="col col-4">评分</p>
				</div>
			</div>
			<div class="m-body">
				<div class="row">
					<p class="col col-2">3114006311</p>
					<p class="col col-3">杨子聪</p>
					<p class="col col-3">计算机学院</p>
					<p class="col col-4">
						<i class="icon icon-edit-active" title="点击进行评分"></i>
					</p>
				</div>
				<div class="row">
					<p class="col col-2">3114006311</p>
					<p class="col col-3">杨子聪</p>
					<p class="col col-3">计算机学院</p>
					<p class="col col-4">
						<input type="number" class="score-input" placeholder="输入分数" min="0" max="100">
						<button class="btn btn-confirm">确定</button>
						<button class="btn">取消</button>
					</p>
				</div>
				<div class="row">
					<p class="col col-2">3114006311</p>
					<p class="col col-3">杨子聪</p>
					<p class="col col-3">计算机学院</p>
					<p class="col col-4">100</p>
				</div>
				<div class="row">
					<p class="col col-2">3114006311</p>
					<p class="col col-3">杨子聪</p>
					<p class="col col-3">计算机学院</p>
					<p class="col col-4">100</p>
				</div>
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


<style lang="sass" src="../sass/MarkPanel.scss"></style>
