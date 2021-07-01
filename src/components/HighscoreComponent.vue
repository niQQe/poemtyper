<template>
	<table>
		<tr>
			<th class="text-left position">#</th>
			<th class="text-left">Username</th>
			<th class="text-right">Accuracy</th>
			<th class="text-right">Time</th>
			<th class="text-right">Score</th>
		</tr>
		<tbody v-if="highscores.length">
			<tr
				v-for="(score, index) in highscores"
				:key="score"
				:class="[fadeIn ? 'fadeIn' : '']"
				:style="`transition-delay:${'0.' + index + 80}s`"
			>
				<td class="text-left ">{{ index + 1 }}</td>
				<td class="text-left">{{ score.email }}</td>
				<td class="text-right">{{ score.accuracy }}%</td>
				<td class="text-right">{{ score.time }}</td>
				<td class="text-right">{{ score.score }}</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr
				v-for="(score, index) in 10"
				:key="score"
				:class="[fadeIn ? 'fadeIn' : '']"
				:style="`transition-delay:${'0.' + index + 80}s`"
			>
				<td class="text-left">{{ index + 1 }}</td>
				<td class="text-left">Could be you!</td>
				<td class="text-right"></td>
				<td class="text-right"></td>
				<td class="text-right"></td>
			</tr>
		</tbody>
	</table>
</template>

<script>

import { watch, ref } from 'vue'

export default {
	props: {
		active: {
			type: String,
			required: false,
		},
		highscores: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		
		const fadeIn = ref()

		watch(() => props.active, (v) => {
			if(v === 'highscore')  {
				setTimeout(() => {
					fadeIn.value = true
				},1)
			}
			else fadeIn.value = false
		})
		return {
			fadeIn
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

.position-number{
	padding-left:30px;
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
