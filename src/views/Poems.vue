<template>
	<div style="width:100%;margin-top:20px;">
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
</template>

<script>
import dataHandler from '@/modules/data-handler.js';
import PoemCard from '@/components/PoemCardComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';

import { useRouter } from 'vue-router';

export default {
	name: 'Home',
	components: {
		PoemCard,
		SelectComponent,
	},
	setup() {
		const router = useRouter();

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
