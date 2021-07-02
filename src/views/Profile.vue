<template>
	<div>
		Profile
	</div>
</template>

<script>
import database from '@/service/Firebase.js';
import { onMounted } from 'vue';

export default {
	setup() {
		onMounted(async () => {
			console.log(await database.getUserScores());
		});
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
