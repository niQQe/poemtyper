<template>
	<div class="poem-wrapper">
		<div class="poem-info">
			<div>
				<div class="title">{{ poem.title }}</div>
				<div class="author">
					Written by <span>{{ poem.author }}</span>
				</div>
			</div>
			<div class="poem-header">
				<div class="poem-nav">
					<button
						@click="setActiveTab('poem')"
						class="item"
						:class="activeTab === 'poem' ? 'active' : ''"
						:style="[activeTab === 'poem' ? 'color:#1a73e8' : '']"
						v-wave="{
							color: '#1a73e8',
							easing: 'ease-out',
							duration: 0.4,
							initialOpacity: 0.2,
							finalOpacity: 0.1,
							cancellationPeriod: 75,
						}"
					>
						Poem
					</button>
					<button
						@click="setActiveTab('highscore')"
						class="item"
						:class="activeTab === 'highscore' ? 'active' : ''"
						:style="[activeTab === 'highscore' ? 'color:#1a73e8' : '']"
						v-wave="{
							color: '#1a73e8',
							easing: 'ease-out',
							duration: 0.4,
							initialOpacity: 0.2,
							finalOpacity: 0.1,
							cancellationPeriod: 75,
						}"
					>
						Highscore
					</button>

					<div class="active-bar" :style="[activeTab == 'poem' ? 'width:101px;left:0px' : 'left:101px;width:131px;']"></div>
				</div>
				<div class="typing-stats" :class="[completed ? 'completed' : '']">
					<div class="value-wrapper">
						<div class="value">{{ progressCounter }}</div>
						<span class="material-icons icon">check</span>
					</div>
					<div class="value-wrapper">
						<div class="value">{{ accuracy }}%</div>
						<span class="material-icons icon">track_changes</span>
					</div>
					<div class="value-wrapper">
						<div class="value timer">{{ timer }}</div>
						<span class="material-icons icon ">timer</span>
					</div>
					<div class="submit-wrapper" :class="[completed ? 'fadeIn' : '']">
						<div class="value-wrapper score">
							<span class="material-icons icon ">star_border</span>
							<div class="value timer">{{ statsHandler.getScore() }}</div>
						</div>
						<button
							class="submit-score"
							:disabled="submitted || !userHandler.isAuthenticated()"
							@click="submitScore"
							:class="submitted ? 'submitted' : ''"
							v-wave="{
								color: 'currentColor',
								easing: 'ease-out',
								duration: 0.4,
								initialOpacity: 0.2,
								finalOpacity: 0.1,
								cancellationPeriod: 75,
							}"
						>
							<div class="loader-wrapper" v-if="scoreIsSubmitting">
								<div class="loader"></div>
							</div>
							<div v-if="!scoreIsSubmitting && !submitted">Submit score</div>
							<div v-if="submitted">Submitted</div>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="content-area-wrapper">
			<div class="content">
				<div class="content-item typing" v-if="activeTab === 'poem'">
					<TypingArea :poem="poem" :activeTab="activeTab" />
				</div>
				<div class="content-item highscore" v-if="activeTab === 'highscore'">
					<Highscore :active="activeTab" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import database from '@/service/Firebase.js';
import TypingArea from '@/components/TypingAreaComponent.vue';
import Highscore from '@/components/HighscoreComponent.vue';
import statsHandler from '@/modules/stats-handler.js';
import dataHandler from '@/modules/data-handler.js';
import userHandler from '@/modules/user-handler.js';
export default {
	components: {
		TypingArea,
		Highscore,
	},
	setup() {
		const { timer, progressCounter, accuracy, completed } = statsHandler;

		/**
		 * If user press the reset button, set submitted to false
		 */
		watch(
			() => completed.value,
			(v) => (v ? (submitted.value = false) : null)
		);

		const scoreIsSubmitting = ref(false);

		const submitted = ref(false);

		const route = useRoute();

		const activeTab = ref('poem');

		const setActiveTab = (tab) => (activeTab.value = tab);

		const poem = dataHandler.getSinglePoem(route.params.id);

		const submitScore = async () => {
			/** Make sure only authenticated users can submit scores */
			if (!userHandler.isAuthenticated()) {
				console.log('Im not that stupid');
				return;
			}
			scoreIsSubmitting.value = true;
			try {
				const response = await database.postScore({
					data: {
						time: statsHandler.getTime(),
						score: statsHandler.getScore(),
						accuracy: statsHandler.getAccuracy(),
						poemId: String(poem.id),
						poemName: poem.title,
						date: new Date(),
					},
				});
				await database.postScoreToUser({
					data: {
						time: statsHandler.getTime(),
						score: statsHandler.getScore(),
						accuracy: statsHandler.getAccuracy(),
						poemId: String(poem.id),
						poemName: poem.title,
						date: new Date(),
					},
				});
				if (response) {
					setTimeout(() => {
						scoreIsSubmitting.value = false;
						submitted.value = true;
					}, 300);
				}
			} catch (e) {
				console.log(e);
			}
		};
		return {
			poem,
			activeTab,
			setActiveTab,
			timer,
			progressCounter,
			accuracy,
			completed,
			submitScore,
			statsHandler,
			scoreIsSubmitting,
			submitted,
			userHandler,
			removeEventListener,
		};
	},
};
</script>

<style scoped>
.content-area-wrapper {
	display: flex;
	position: relative;
	overflow: hidden;
	width: 100%;
	padding-bottom: 200px;
}

.content {
	position: relative;
	width: 100%;
	transition: all 0.3s ease;
}

.typing {
	left: 0px;
}

.highscore {
	margin-top: 0px;
	left: 100%;
}

.poem-wrapper {
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	float: left;
	width: 100%;
}

.poem-header {
	display: flex;
	height: 47px;
	width: 100%;
	margin-top: 8px;
	border-bottom: 1px solid rgb(218, 220, 224);
}

.poem-nav {
	display: flex;
	position: relative;
}

.submit-wrapper {
	transition: all 0.2s ease;
	transition-delay: 0.2s;
	transform: translateY(10px);
	position: relative;
	box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.233);
	border-radius: 8px;
	height: 34px;
	padding: 2px;
	padding-right: 3px;
	padding-bottom: 3px;
	overflow: hidden;
	margin-left: 20px;
	opacity: 0;
	display: flex;
	align-items: center;
}

.submit-score {
	border: none;
	padding: 4px 10px;
	min-width: 106px;
	height: 100%;
	color: #147aff;
	position: relative;
	background: #3e8ffa1e;
	border-radius: 6px;
	margin-left: 0px;
	font-family: 'Poppins';
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
}

.submit-score:disabled {
	pointer-events: none;
	color: #666 !important;
	background: #e4e4e4 !important;
}

.submit-score:hover {
	background: #3e8ffa33 !important;
}

.fadeIn {
	opacity: 1 !important;
	transform: translateY(0px) !important;
}

.completed {
	margin-right: 0px !important;
}

.typing-stats {
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
	display: flex;
	align-items: center;
	margin-left: 30px;
	margin-right: -232px;
	font-family: 'Roboto Mono';
	transition: all 0.2s ease;
}

.typing-stats .value-wrapper {
	margin-left: 35px;
	flex-direction: row;
	display: flex;
	font-size: 14px;
	font-weight: 400;
	align-items: center;
	color: #666;
}

.value-wrapper.score {
	color: #3e8ffa !important;
	border-radius: 8px;
	padding-left: 5px;
	margin: 0 !important;
}

.value-wrapper.score .icon {
	margin: 0 !important;
	font-size: 23px;
}

.value {
	font-weight: 500;
	min-width: 50px;
	width: 50px;
	text-align: right;
}

.value.timer {
	font-feature-settings: 'tnum';
	margin-right: 20px;
	font-variant-numeric: tabular-nums;
}

.icon {
	margin-left: 10px;
	font-size: 22px;
	color: rgb(156, 156, 156);
}

.active-bar {
	height: 2px;
	position: absolute;
	background: #1a73e8;
	bottom: -1px;
	transition: all 0.2s ease;
}

.item {
	display: flex;
	color: #666;
	cursor: pointer;
	background: #fff;
	font-weight: 600;
	font-family: 'Poppins';
	border: none;
	align-items: center;
	font-size: 14px;
	padding: 10px 30px;
	height: 100%;
	font-weight: 500;
}

.item:hover {
	background: #f8f8f8;
	color: #222;
}

.active:hover {
	background: #1a73e80a !important;
}

.poem-info {
	display: flex;
	flex-direction: column;
	top: 64px;
	background: #fff;
	float: left;
	width: 100%;
	padding: 10px 0px 0px 0px;
	z-index: 20;
}

.author {
	color: #5f6368;
	font-size: 14px;
	margin-top: 10px;
	float: left;
	width: 100%;
	padding-bottom: 20px;
}

.info-wrapper {
	font-size: 13px;
	color: #5f6368;
	float: left;
	padding: 20px 0px;
}

.info {
	border-radius: 8px;
	border-radius: 8px;
	font-weight: 500;
	color: #000000c7;
	align-items: center;
	display: flex;
	border: 1px solid rgb(218, 220, 224);
	padding: 10px;
}

.info button {
	border: none;
	background: transparent;
	text-transform: uppercase;
	font-weight: 600;
	border: 1px solid #1a73e8;
	padding: 2px 10px;
	border-radius: 4px;
	color: #1a73e8;
	font-family: 'Poppins';
	margin-left: 10px;
}

.loader-wrapper {
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	display: flex;
}

.submitted {
	background: #1a73e8 !important;
	color: #fff !important;
	pointer-events: none;
}

.loader {
	border: 2px solid #e8f2ff;
	border-top: 2px solid #1a73e8;
	border-radius: 50%;
	margin: auto;
	width: 20px;
	height: 20px;
	animation: spin 0.4s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

i {
	color: #1a73e8;
	font-size: 22px;
	margin-right: 10px;
}

.author span {
	color: #1a73e8;
}

.title {
	color: #202124;
	width: 100%;
	float: left;
	font-size: 4.1vh;
}
</style>
