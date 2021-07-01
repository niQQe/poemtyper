<template>
	<div
		class="poem-card"
		v-wave="{
			color: 'currentColor',
			easing: 'ease-out',
			duration: 0.3,
			initialOpacity: 0.4,
			finalOpacity: 0.1,
			cancellationPeriod: 75,
		}"
	>
		<div class="poem-title">{{ poemData.title }}</div>
		<div class="poem-author">{{ poemData.author }}</div>
		<div class="poem-sample" :class="[fadeUp ? 'fadeUp' : '']">{{ createSample(poemData.lines) }}</div>
		<div class="poem-lines">{{ poemData.lines.length }}</div>
		<div style="position:absolute;bottom:30px;left:0;width:100%;height:30px;background-image: linear-gradient(transparent, white);"></div>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	props: {
		poemData: {
			type: Object,
			requried: true,
		},
	},
	setup() {
		const fadeUp = ref(false);

		const createSample = (lines) => {
			return lines.join` `.substring(0, 90) + '...';
		};

		setTimeout(() => {
			fadeUp.value = true;
		}, 10);
		return {
			createSample,
			fadeUp,
		};
	},
};
</script>

<style scoped>
.poem-card {
	border: 1px solid #dadce0;
	border-radius: 10px;
	position:relative;
	overflow:hidden;
	width: 100%;
	height: 100%;
	float: left;
	display: flex;
	flex-direction: column;
	padding: 15px;
	transition: all 0.18s ease;
	user-select: none;
}

.poem-card:hover {
	box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
	transform: translateY(-1px);
	cursor: pointer;
}

.poem-title {
	text-align: left;
	font-size: 17px;
	font-weight: 400;
	color: #202124;
}

.poem-sample {
	flex: 1;
	text-align: left;
	font-family: 'Nunito';
	font-size: 24px;
	transform: translateY(10px);
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	opacity: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: break-word;
	padding-top: 20px;
	font-weight: 400;
	color: rgb(15, 15, 15);
	word-break: break-word;
}

.fadeUp {
	transform: translateY(0px);
	opacity: 1;
}

.poem-lines {
	text-align: right;
	font-family: 'Roboto';
	font-size: 13px;
	color: #5f6368;
}

.poem-author {
	margin-top: 5px;
	text-align: left;
	font-family: 'Roboto';
	font-size: 14px;
	font-weight: 400;
	color: #5f6368;
	letter-spacing: 0.2px;
}
</style>
