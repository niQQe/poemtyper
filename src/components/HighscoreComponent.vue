<template>
	<datatable v-if="highscoreLoaded" :data="highscores" :fadeIn="fadeIn"></datatable>
</template>

<script>
import { ref, onMounted } from 'vue';

import { useRoute } from 'vue-router';

import datatable from '@/components/TableComponent.vue';

import database from '@/service/Firebase.js';

export default {
	components: {
		datatable,
	},
	props: {
		active: {
			type: String,
			required: false,
		},
	},
	setup() {
		const fadeIn = ref(false);

		const route = useRoute();

		const highscores = ref([]);

		const highscoreLoaded = ref(false);

		const getHighscores = async () => {
			try {
				const response = await database.getHighscores({ id: route.params.id });
				highscores.value = response;
			} catch (e) {
				console.log(e);
			}
		};

		onMounted(async () => {
			await getHighscores();
			highscoreLoaded.value = true;
			setTimeout(() => {
				fadeIn.value = true;
			}, 100);
		});
		return {
			fadeIn,
			highscores,
			highscoreLoaded,
		};
	},
};
</script>

<style scoped>
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

.position {
	max-width: 30px;
}

.position-number {
	padding-left: 30px;
}

.fadeIn {
	opacity: 1 !important;
	border-bottom: 1px solid #e2e2e2 !important;
	transform: translateY(0px) !important;
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

tr:not(:first-child) {
	opacity: 0;
	transform: translateY(10px);
}

.text-center {
	text-align: center;
}

.text-right {
	text-align: right;
}
</style>
