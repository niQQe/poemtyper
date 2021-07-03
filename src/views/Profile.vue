<template>
	<div>
		Profile
		<div v-for="(poem, name) in typedPoems" :key="poem">
			<div style="margin-bottom:10px;margin-top:20px;float:left;100%;">{{ name }}</div>
			<div v-for="(data, index) in poem" :key="index">
				<div style="float:left;width:100%;">
					<div style="margin-right:10px;float:left;">{{ data.accuracy }}%</div>
					<div style="margin-right:10px;float:left;">
						{{ data.time }}
					</div>
					<div style="margin-right:10px;float:left;">
						{{ data.score }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import database from '@/service/Firebase.js';
import { ref, onMounted } from 'vue';

export default {
	setup() {
		const typedPoems = ref([]);
		onMounted(async () => {
			typedPoems.value = await database.getUserScores();
		});
		return {
			typedPoems,
		};
	},
};
</script>

<style lang="scss" scoped></style>
