<template>
	<table>
		<tr>
			<th class="text-left position">#</th>
			<th class="text-left position">User</th>
			<th class="text-left position">Date</th>
			<th class="text-right position">Accuracy</th>
			<th class="text-right position">Time</th>
			<th class="text-right position">Score</th>
		</tr>
		<tbody v-if="data.length">
			<tr v-for="(score, index) in data" :key="score" :class="[fadeIn ? 'fadeIn' : '']" :style="`transition-delay:${'0.' + index + 80}s`">
				<td class="text-left ">{{ index + 1 }}</td>
				<td class="text-left">{{ score.email }}</td>
				<td class="text-left">{{ formatDate(score.date.seconds) }}</td>
				<td class="text-right">{{ score.accuracy }}%</td>
				<td class="text-right">{{ score.time }}</td>
				<td class="text-right">{{ score.score }}</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr v-for="(score, index) in 10" :key="score" :class="[fadeIn ? 'fadeIn' : '']" :style="`transition-delay:${'0.' + index + 80}s`">
				<td class="text-left">{{ index + 1 }}</td>
				<td class="text-left">Could be you!</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import dayjs from 'dayjs';

export default {
	props: {
		data: {
			type: Array,
			required: true,
		},
		fadeIn: {
			type: Boolean,
			required: true,
		},
	},
	setup() {
		var utc = require('dayjs/plugin/utc');
		dayjs.extend(utc);

		const formatDate = (timestamp) => {
			const date = dayjs.unix(timestamp);
			return date.local().format('hh:mm:ss A, dddd, MMMM D YYYY');
		};

		return {
			formatDate,
		};
	},
};
</script>

<style scoped>
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
