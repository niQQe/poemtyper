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
				console.log('HÄR');
				console.log(user);
				if (user) {
					const { email, photoUrl, uid } = user;
					console.log(email, photoUrl, uid);
					userHandler.setUserInfo({ email, photoUrl, uid });
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
