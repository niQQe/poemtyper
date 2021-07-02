<template>
	<datatable :highscores="highscores" :fadeIn="fadeIn"></datatable>
</template>

<script>
import { watch, ref } from 'vue';

import datatable from '@/components/TableComponent.vue';

export default {
	components: {
		datatable,
	},
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
		const fadeIn = ref(false);

		watch(
			() => props.active,
			(v) => {
				if (v === 'highscore') {
					setTimeout(() => {
						fadeIn.value = true;
					}, 1);
				} else fadeIn.value = false;
			}
		);
		return {
			fadeIn,
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
