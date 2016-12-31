<template>
	<span>
		<label class="widget-title" :for="elemId">
			{{labelName}}：
		</label>
		<input :type="type ? type : 'text'" class="form-control" :id="elemId" :placeholder="defaultMsg" :value="msg">
	</span>
</template>

<script>
	export default {
		props: ['labelName' ,'elemId', 'msg', 'defaultMsg', 'type'],
	}
</script>

