<template>
	<div class="widget-row">
		<label class="widget-title" :for="elemId">
			{{labelName}}：
		</label>
		<input 
			:type="type ? type : 'text'" 
			class="form-control" 
			:id="elemId" 
			:placeholder="defaultMsg" 
			:value="value"
			@input="updateValue($event.target.value)"
			>
		<p class="widget-tip" v-if="tip">{{tip}}</p>
	</div>
</template>

<script>
	export default {
		props: ['labelName' ,'elemId', 'value', 'defaultMsg', 'type', 'tip'],
		methods: {
			updateValue: function(value) {
				this.$emit('update', value);
			}
		}
	}
</script>

