<template>
	<button @click="login()">Login</button>
</template>
<script>
import firebase from 'firebase';
import userHandler from '@/modules/user-handler.js';

export default {
	setup() {
		const login = async () => {
			const provider = new firebase.auth.GoogleAuthProvider();
			try {
				const user = await firebase.auth().signInWithPopup(provider);
				console.log(user);
				if (user) {
					const { email, picture, id } = user.additionalUserInfo.profile;
					userHandler.setUserInfo({ email, picture, id });
				}
			} catch (e) {
				console.log(e);
			}
		};
		return {
			login,
		};
	},
};
</script>

<style lang="scss" scoped></style>
