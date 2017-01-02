<template>
	<div>
		<user-header ref="userheader"></user-header>
		<div id="main">
			<router-view @loginChange="loginStatusChange"></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			// console.log('1');
		},
		methods: {
			loginStatusChange(data) {
				this.$refs.userheader.updateLoginStatus(data);
			},
		},
	}
</script>

<style lang="sass" src="../sass/Main.scss"></style>
