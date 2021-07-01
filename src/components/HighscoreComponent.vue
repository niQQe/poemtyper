<template>
	<table>
		<tr>
			<th class="text-left position">Position</th>
			<th class="text-left">Username</th>
			<th class="text-right">Accuracy</th>
			<th class="text-right">Time</th>
			<th class="text-right">Score</th>
		</tr>
		<tr v-for="(n, index) in 10" :key="n" :class="[active === 'highscore' ? 'fadeIn' : '']" :style="`transition-delay:${'0.2' + index+80}s`">
			<td class="text-left">{{ index + 1 }}</td>
			<td class="text-left">nickewideving@gmail.com</td>
			<td class="text-right">98%</td>
			<td class="text-right">01:23:29</td>
			<td class="text-right">1220</td>
		</tr>
	</table>
</template>

<script>
export default {
	props: {
		active: {
			type: String,
			required: false,
		},
	},
	setup() {
		return {};
	},
};
</script>

<style scoped>
table {
	width: 100%;
	border-collapse: collapse;
	font-family: 'Google sans';
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

.fadeIn {
	opacity: 1 !important;
	border-bottom: 1px solid #e2e2e2 !important;
	transform: translateY(0px)!important;
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
