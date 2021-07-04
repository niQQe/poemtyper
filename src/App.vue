<template>
	<nav
		:class="[addNavShadow ? 'nav-shadow' : '']"
		style="height:64px;width:100%;border-bottom:1px solid #dadce0;position:fixed;top:0px;display:flex;justify-content:center;background:#fff;z-index:200;"
	>
		<div class="nav-container">
			<div class="logo">
				<div class="logo-img"></div>
				<span>Poetry</span> Typer
			</div>
			<div class="router-items">
				<router-link
					class="item"
					v-for="item in routerItems"
					:to="item.href"
					:style="!item.active ? 'pointer-events:none' : ''"
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
					<div style="display:flex;align-items:center;font-weight:500;margin-left:30px;cursor:pointer">
						<img
							style="width:30px;height:30px;border-radius:30px;margin-left:auto"
							@click="$router.push('/profile')"
							:src="userHandler.getUserInfo.value.photoURL"
						/>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<div style="margin-top:64px;display:flex; justify-content:center">
		<div class="router-content" v-if="fetchComplete">
			<router-view style="width:90%;" />
		</div>
	</div>
</template>

<script>
import dataHandler from '@/modules/data-handler.js';
import userHandler from '@/modules/user-handler.js';
import Database from '@/service/Firebase.js';
import firebase from 'firebase/app';
import 'firebase/auth';

import { onMounted, ref } from 'vue';

export default {
	name: 'App',
	setup() {
		const routerItems = [
			{
				text: 'Browse Poems',
				href: '/',
				active: true,
			},
			{
				text: 'Rankings',
				href: '/rankings',
				active: false,
			},
		];

		const { getPoems } = dataHandler;

		const fetchComplete = ref(false);

		const addNavShadow = ref(false);

		// TODO FIXA ALL INLINESTYLEING

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
					userHandler.setUserInfo({ email, photoURL, uid });
				}
			} catch (e) {
				console.log(e);
			}
		};

		onMounted(async () => {
			/** Handles the shadow under the nav when scrolling */
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
			login,
			Database,
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

.nav-container {
	width: 100%;
	padding: 0px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	align-items: stretch;
}

.router-content {
	width: 90%;
	display: flex;
}

.logo span {
	font-weight: 500;
	float: left;
	margin-right: 5px;
}

@media only screen and (max-width: 1200px) {
	body {
		display: none;
	}
}

@media only screen and (min--moz-device-pixel-ratio: 2),
	only screen and (-o-min-device-pixel-ratio: 2/1),
	only screen and (-webkit-min-device-pixel-ratio: 2),
	only screen and (min-device-pixel-ratio: 2) {
	.nav-container {
		width: 90%;
	}
	.router-content {
		width: 90%;
	}
}
</style>
