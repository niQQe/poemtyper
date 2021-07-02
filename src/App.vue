<template>
	<nav
		:class="[addNavShadow ? 'nav-shadow' : '']"
		style="height:64px;width:100%;border-bottom:1px solid #dadce0;position:fixed;top:0px;display:flex;justify-content:center;background:#fff;z-index:200;"
	>
		<div style="width:80%;display:flex;align-items:center;justify-content:space-between;align-items:stretch">
			<div class="logo">
				<div class="logo-img"></div>
				<span>Poetry</span> Typer
			</div>
			<div class="router-items">
				<router-link
					class="item"
					v-for="item in routerItems"
					:to="item.href"
					:key="item"
					v-wave="{
						color: 'currentColor',
						easing: 'ease-out',
						duration: 0.4,
						initialOpacity: 0.2,
						finalOpacity: 0.1,
						cancellationPeriod: 75,
					}"
				>
					{{ item.text }}
				</router-link>
				<div
					class="item"
					v-if="!userHandler.authenticated.value"
					@click="login"
					v-wave="{
						color: 'currentColor',
						easing: 'ease-out',
						duration: 0.4,
						initialOpacity: 0.2,
						finalOpacity: 0.1,
						cancellationPeriod: 75,
					}"
				>
					Sign in
				</div>
				<div v-if="userHandler.isAuthenticated()">
					<div style="display:flex;align-items:center;font-weight:500;margin-left:30px;">
						<img
							style="width:30px;height:30px;border-radius:30px;margin-right:15px;"
							@click="logout()"
							:src="userHandler.getUserInfo.value.photoURL"
						/>
						<!-- {{ userHandler.userInfo.value.displayName }} -->
					</div>
					<!-- <button @click="logout">Logout</button> -->
				</div>
			</div>
		</div>
	</nav>
	<div style="margin-top:64px;display:flex; justify-content:center">
		<div style="width:80%;display:flex" v-if="fetchComplete">
			<router-view />
		</div>
	</div>
</template>

<script>
import dataHandler from '@/modules/data-handler.js';
import userHandler from '@/modules/user-handler.js';
import firebase from 'firebase';

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

export default {
	name: 'App',
	setup() {
		const routerItems = [
			{
				text: 'Browse Poems',
				href: '/',
			},
			{
				text: 'Rankings',
				href: '/rankings',
			},
		];

		const { getPoems } = dataHandler;

		const fetchComplete = ref(false);

		const addNavShadow = ref(false);

		const router = useRouter();

		// TODO FIXA ALL INLINESTYLEING, BILD SYNS INTE VID FÖRSTA INLOGG

		// TODO FIXA SÅ ATT DINA SCORES SYNS PÅ DIN PROFIL

		// TODO FIXA SÅ MAN KAN GÅ IN PÅ aNDRAS PROFILER O SE DERAS SCORES

		/**
		 * Check if user is sigend in
		 */
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) return;
			const { email, photoURL, uid } = user;
			userHandler.setUserInfo({ email, photoURL, uid });
			userHandler.setAuthenticated();
		});

		const login = async () => {
			const provider = new firebase.auth.GoogleAuthProvider();
			try {
				const userInfo = await firebase.auth().signInWithPopup(provider);
				if (userInfo) {
					const { email, photoURL, uid } = userInfo.user;
					console.log(photoURL);
					userHandler.setUserInfo({ email, photoURL, uid });
				}
			} catch (e) {
				console.log(e);
			}
		};

		const logout = async () => {
			await firebase.auth().signOut();
			userHandler.unsetAuthenticated();
			router.push('/');
		};

		onMounted(async () => {
			const handleScroll = () => {
				if (window.scrollY > 80) {
					addNavShadow.value = true;
				} else {
					addNavShadow.value = false;
				}
			};
			window.addEventListener('scroll', handleScroll);

			await getPoems();
			fetchComplete.value = true;
		});

		return {
			fetchComplete,
			routerItems,
			addNavShadow,
			userHandler,
			logout,
			login,
		};
	},
};
</script>

<style>
* {
	box-sizing: border-box;
}
html,
body {
	margin: 0;
	background: #fff;
}

body {
	overflow-y: scroll;
}

#app {
	font-family: 'Poppins', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

nav {
	transition: all 0.2s ease;
}

.nav-shadow {
	box-shadow: 0px 1px 5px 0px #00000038;
}

.logo-img {
	background-image: url('assets/logo.png');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
	z-index: 100;
	height: 100%;
	width: 42px;
	margin-right: 10px;
}

.logo {
	color: #666;
	font-size: 23px;
	display: flex;
	align-items: center;
	font-weight: 400;
}

.router-items {
	display: flex;
	font-size: 15px;
	align-items: center;
}

.router-items .item {
	display: flex;
	color: #666;
	cursor: pointer;
	align-items: center;
	padding: 0px 24px;
	height: 100%;
	font-weight: 500;
}
.router-items .item:hover {
	background: #f8f8f8;
	color: #222;
}

.router-link-exact-active {
	color: #1a73e8 !important;
	border-bottom: 2px solid #1a73e8;
	margin-top: 1px;
}

.router-link-exact-active:hover {
	background: #1a73e80a !important;
}

a {
	text-decoration: none;
}

.logo span {
	font-weight: 500;
	float: left;
	margin-right: 5px;
}
</style>
