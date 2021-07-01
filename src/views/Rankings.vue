<template>
	<div style="width:100%;">
		<div class="title">Rankings</div>
		<table>
			<tr>
				<th class="text-left position">Position</th>
				<th class="text-left">Username</th>
				<th class="text-right">Accuracy</th>
				<th class="text-right">Time</th>
				<th class="text-right">Score</th>
			</tr>
			<tr v-for="(n, index) in 20" :key="n">
				<td class="text-left">{{ index + 1 }}</td>
				<td class="text-left">nickewideving@gmail.com</td>
				<td class="text-right">98%</td>
				<td class="text-right">01:23:29</td>
				<td class="text-right">1220</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	setup() {

		//TODO FIXA GLOBAL RANKING
		return {};
	},
};
</script>

<style scoped>
.title {
	color: #202124;
	width: 100%;
	float: left;
	font-size: 36px;
	margin: 20px 0px;
}
table {
	width: 100%;
	border-collapse: collapse;
	font-family: 'Poppins';
}

th {
	font-weight: 500;
    border-top: 1px solid rgb(218, 220, 224);
	border-bottom: 1px solid rgb(218, 220, 224);
	font-size: 14px;
}
.text-left {
	text-align: left;
}

.position {
	max-width: 30px;
}

td {
	font-size: 15px;
}

tr {
	height: 50px;
	padding: 10px 0px;
	border-bottom: 1px solid #e2e2e2;
}

.text-center {
	text-align: center;
}

.text-right {
	text-align: right;
}
</style>
