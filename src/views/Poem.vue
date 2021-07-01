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

					<div class="active-bar" :style="[activeTab == 'poem' ? 'width:96px;left:0px' : 'left:97px;width:127px;']"></div>
				</div>
				<div class="typing-stats" :style="[activeTab === 'highscore' ? 'opacity:0' : '']" :class="[completed ? 'completed' : '']">
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
						<button
							class="submit-score"
							v-wave="{
								color: 'currentColor',
								easing: 'ease-out',
								duration: 0.4,
								initialOpacity: 0.2,
								finalOpacity: 0.1,
								cancellationPeriod: 75,
							}"
						>
							Submit score
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="content-area-wrapper">
			<div class="content" :style="[activeTab === 'poem' ? 'left:0;opacity:1' : 'left:-1152px']">
				<div class="content-item typing">
					<TypingArea :poem="poem" />
				</div>
				<div class="content-item highscore">
					<Highscore :active="activeTab" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TypingArea from '@/components/TypingAreaComponent.vue';
import Highscore from '@/components/HighscoreComponent.vue';
import statsHandler from '@/modules/stats-handler.js';
import dataHandler from '@/modules/data-handler.js';
export default {
	components: {
		TypingArea,
		Highscore,
	},
	setup() {
		const { timer, progressCounter, accuracy, completed } = statsHandler;

		const { getSinglePoem } = dataHandler;

		const route = useRoute();

		const poem = getSinglePoem(route.params.id);

		const activeTab = ref('poem');

		const setActiveTab = (tab) => (activeTab.value = tab);

		return {
			poem,
			activeTab,
			setActiveTab,
			timer,
			progressCounter,
			accuracy,
			completed,
		};
	},
};
</script>

<style scoped>
.content-area-wrapper {
	display: flex;
	position: relative;
	overflow: hidden;
	width: 80%;
	height: 600px;
}

.content {
	position: relative;
	width: 100%;
	transition: all 0.3s ease;
}

.content-item {
	width: 100%;
	position: absolute;
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
	width: 80%;
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
	opacity: 0;
}

.submit-score {
	border: none;
	border: 1px solid #1a73e8;
	padding: 0px 15px;
	color: #1a73e8;
	background: #fff;
	border-radius: 4px;
	height: 33px;
	margin-left: 20px;
	font-family: 'Google Sans';
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
}

.submit-score:hover {
	background: rgba(26, 115, 232, 0.04) !important;
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
	margin-left: auto;
	margin-right: -141px;
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

.value {
	color: #222;
	font-weight: 500;
	min-width: 50px;
	width: 50px;
	text-align: right;
}

.value.timer {
	width: auto !important;
}

.icon {
	margin-left: 10px;
	margin-bottom: 3px;
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
	font-family: 'Google Sans';
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

.poem-info {
	position: sticky;
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

.author span {
	color: #1a73e8;
}

.title {
	color: #202124;
	width: 100%;
	float: left;
	font-size: 36px;
}
</style>
