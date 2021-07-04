<template>
	<div class="profile-wrapper">
		<div class="user-info">
			<img height="60" :src="photoURL" alt="" />
			<div>
				{{ email }}
				<button class="sign-out" @click="logout">Sign out</button>
			</div>
			<div class="user-score">{{ totalScore }}<span>Points</span></div>
		</div>
		<div
			v-for="(poem, name) in typedPoems"
			:key="poem"
			@click="setActivePoem(name)"
			class="score details"
			:class="activePoems.includes(name) ? 'expand' : ''"
		>
			<div class="poem-name">
				{{ name }}
			</div>
			<table>
				<tr>
					<th class="text-left position">Date</th>
					<th class="text-right position">Accuracy</th>
					<th class="text-right position">Time</th>
					<th class="text-right position">Score</th>
				</tr>
				<tbody>
					<tr v-for="score in poem" :key="score">
						<td class="text-left">{{ formatDate(score.date.seconds) }}</td>
						<td class="text-right">{{ score.accuracy }}%</td>
						<td class="text-right">{{ score.time }}</td>
						<td class="text-right">{{ score.score }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import database from '@/service/Firebase.js';
import userHandler from '@/modules/user-handler.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import firebase from 'firebase/app';

import 'firebase/auth';

import dayjs from 'dayjs';

export default {
	components: {},
	setup() {
		const router = useRouter();
		const typedPoems = ref([]);

		const activePoem = ref('');

		const headers = [
			{ text: 'Date', align: 'left' },
			{ text: 'Accuracy', align: 'right' },
			{ text: 'Time', align: 'right' },
			{ text: 'Score', align: 'right' },
		];

		var utc = require('dayjs/plugin/utc');
		dayjs.extend(utc);

		const formatDate = (timestamp) => {
			const date = dayjs.unix(timestamp);
			return date.local().format('hh:mm:ss A, dddd, MMMM D YYYY');
		};

		const { email, photoURL } = userHandler.getUserInfo.value;

		const totalScore = ref(0);

		const activePoems = ref([]);

		const setActivePoem = (name) => {
			const index = activePoems.value.findIndex((poem) => poem === name);

			if (index != -1) {
				activePoems.value.splice(index, 1);
			} else {
				activePoems.value.push(name);
			}
		};

		const logout = async () => {
			await firebase.auth().signOut();
			userHandler.unsetAuthenticated();
			router.push('/');
		};
		onMounted(async () => {
			typedPoems.value = await database.getUserScores();

			/**
			 * Get total score
			 */

			for (let key in typedPoems.value) {
				typedPoems.value[key].forEach((poem) => {
					totalScore.value += +poem.score;
				});
			}
		});
		return {
			typedPoems,
			activePoem,
			setActivePoem,
			userHandler,
			email,
			photoURL,
			headers,
			formatDate,
			activePoems,
			totalScore,
			logout,
		};
	},
};
</script>

<style scoped>
.profile-wrapper {
	margin-top: 20px;
	width: 100%;
	padding: 10px 0px;
}

img {
	border-radius: 100%;
	margin-right: 20px;
}

.expand {
	max-height: 500px !important;
}

.score-wrapper {
	float: left;
	width: 100%;
	margin-top: 20px;
	padding: 20px 0px;
	border-radius: 8px;
	border: 1px solid rgb(218, 220, 224);
}

.sign-out {
	background: #1a73e8;
	border: none;
	padding: 5px 10px;
	border-radius: 4px;
	color: #fff;
	font-family: 'Poppins';
	font-weight: 500;
	margin-left: 20px;
}

.sign-out:hover {
	cursor: pointer;
	background: #135ab8;
}

.poem-name {
	float: left;
	width: 100%;
	font-size: 28px;
	height: 60px;
}

.details {
	border-radius: 8px;
	margin-top: 10px;
	border: 1px solid rgb(218, 220, 224);
	float: left;
	max-height: 60px;
	transition: all 0.2s ease;
	overflow: hidden;
	width: 100%;
	padding: 8px 15px;
	cursor: pointer;
}

.details:hover {
	background: #f8f8f8;
}

.user-score {
	margin-left: auto;
	font-size: 50px;
	margin-right: 20px;
	color: #1a73e8;
}

.user-score span {
	font-size: 32px;
	color: #666;
	margin-left: 20px;
}

.user-info {
	width: 100%;
	align-items: center;
	background: #f8f9fa;
	display: flex;
	float: left;
	padding: 20px;
	border-radius: 8px;
	border: 1px solid rgb(218, 220, 224);
}

table {
	width: 100%;
	border-collapse: collapse;
	font-family: 'Poppins';
}

th {
	font-weight: 500;
	border-bottom: 1px solid rgb(218, 220, 224);
	font-size: 14px;
}
.text-left {
	text-align: left;
}

td {
	font-size: 15px;
}

tr {
	height: 50px;
	padding: 10px 0px;
	transition: all 0.3s ease;
	border-bottom: 1px solid transparent;
}

.text-center {
	text-align: center;
}

.text-right {
	text-align: right;
}
</style>
