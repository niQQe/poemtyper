<template>
	<div style="width:calc(100% - 300px);margin-top:20px;">
		<div style="padding:10px 10px;display:flex;">
			<div style="border:1px solid #dadce0;height:54px;display:flex;border-radius:40px;width:100%;align-items:center;padding:0px 15px;">
				<span class="material-icons" style="color:#1a73e8;margin-right:5px;">search</span>
				<input placeholder="Search" v-model="searchString" style="width:100%;" type="text" />
			</div>
		</div>
		<div style="display:flex;padding:0px 10px;margin-top:10px;">
			<select-component />
		</div>
		<div class="poemscounter">{{ filteredPoems.length }} of {{ poemsAmount }} poems</div>
		<div v-for="poem in filteredPoems" :key="poem" class="poem-wrapper">
			<poem-card :poemData="poem" @click="goTo(poem.id)" />
		</div>
	</div>
	<div class="side-score-nav">
		<div style="width:100%;">
			<div style="padding:0px 0px;font-weight:500;margin-bottom:10px;">Latest scores</div>
			<div v-for="scores in Database.realTimeScores.value" :key="scores" class="score-card-container">
				<div
					class="score-card"
					@click="goTo(scores.poemId)"
					v-wave="{
						color: 'currentColor',
						easing: 'ease-out',
						duration: 0.3,
						initialOpacity: 0.4,
						finalOpacity: 0.1,
						cancellationPeriod: 75,
					}"
				>
					<div class="poem-name">
						{{ scores.poemName }}
					</div>
					<div style="width:100%;float:left;word-break:break-all">
						{{ scores.email }}
					</div>
					{{ scores.accuracy }}%
					{{ scores.time }}
					{{ scores.score }}
					<div style="color:#222;margin-top:5px;font-size:12px;">
						{{ formatDate(scores.date.seconds) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dataHandler from '@/modules/data-handler.js';
import Database from '@/service/Firebase.js';
import PoemCard from '@/components/PoemCardComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';

import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

export default {
	name: 'Home',
	components: {
		PoemCard,
		SelectComponent,
	},
	setup() {
		const router = useRouter();

		var utc = require('dayjs/plugin/utc');
		dayjs.extend(utc);

		const formatDate = (timestamp) => {
			const date = dayjs.unix(timestamp);
			return date.local().format('hh:mm:ss A, dddd, MMMM D YYYY');
		};

		const { poemsAmount, searchString, filteredPoems } = dataHandler;

		const goTo = (id) => {
			setTimeout(() => {
				router.push(`/poems/${id}`);
			}, 300);
		};

		return {
			goTo,
			filteredPoems,
			poemsAmount,
			searchString,
			Database,
			formatDate,
		};
	},
};
</script>

<style scoped>
.poem-card {
	border: 1px solid #dadce0;
	border-radius: 10px;
	width: 100%;
	height: 100%;
	float: left;
	display: flex;
	flex-direction: column;
	padding: 15px;
	transition: all 0.18s ease;
	user-select: none;
}

.poem-wrapper {
	width: 25%;
	padding: 10px;
	height: 303px;
	float: left;
}

.poemscounter {
	display: flex;
	padding: 0px 10px;
	font-size: 12px;
	margin: 45px 0px 20px 0px;
	color: #5f6368;
}

.score-card-container {
	padding-bottom: 10px;
}

.score-card {
	font-size: 13px;
	border: 1px solid #e2e2e2;
	border-radius: 8px;
	padding: 8px;
	margin-bottom: 10px;
}

.score-card:hover {
	box-shadow: 0 3px 3px 0 rgb(60 64 67 / 30%), 0 3px 6px 2px rgb(60 64 67 / 15%);
	transform: translateY(-1px);
	cursor: pointer;
	transition: all 0.2s ease;
}

.side-score-nav {
	width: 300px;
	position: fixed;
	float: left;
	right: 0px;
	height: calc(100vh - 60px);
	overflow: auto;
	display: flex;
	padding: 10px;
	right: 0px;
	top: 64px;
	z-index: 00;
}

/* width */
::-webkit-scrollbar {
	width: 5px;
	padding: 0px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #dadce0;
	border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
.score-card .poem-name {
	color: #1a73e8;
	margin-bottom: 5px;
	font-weight: 500;
}

input {
	font-size: 16px;
	border: none;
	background: transparent;
}

input:focus {
	outline: none;
}

input::placeholder {
	font-weight: 500;
}

input:focus::placeholder {
	color: #1a73e8;
}
</style>
