<template>
	<div class="widget-row">
		<label class="widget-title" :for="elemId">
			{{labelName}}：
		</label>
		<select 
			:type="type ? type : 'text'" 
			class="form-control" 
			:id="elemId" 
			:value="value"
			@change="updateValue($event.target.value)"
			>
			<slot></slot>
		</select>
		<p class="widget-tip" v-if="tip">{{tip}}</p>
	</div>
</template>

<script>
	export default {
		props: ['labelName' ,'elemId', 'value', 'type', 'tip'],
		methods: {
			updateValue: function(value) {
				this.$emit('update', value);
			}
		}
	}
</script>

