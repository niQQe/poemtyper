<template>
	<div class="select">
		<button class="" @click="showOptions = true" @blur="showOptions = false">
			<div
				class="ripple"
				v-wave="{
					color: '#1a73e8',
					easing: 'ease-out',
					duration: 0.3,
					initialOpacity: 0.4,
					finalOpacity: 0.1,
					cancellationPeriod: 75,
				}"
			></div>
			<span class="selected">
				Author
			</span>
			<span class="material-icons arrow" :style="[showOptions ? 'transform:rotate(180deg)' : '']">
				arrow_drop_down
			</span>
		</button>
		<div class="options-container" :class="[addTransitionClass ? 'test' : '']" v-if="showOptions">
			<div class="options">
				<div @click="showOptions = false" class="option">William Shakespeare</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
	setup() {
		const showOptions = ref(false);

		const addTransitionClass = ref(false);

		watch(
			() => showOptions.value,
			(show) => {
				if (show) setTimeout(() => (addTransitionClass.value = true), 1);
				else addTransitionClass.value = false;
			}
		);
		return {
			showOptions,
			addTransitionClass,
		};
	},
};
</script>

<style scoped>
.select {
	position: relative;
}

.select button {
	border: 1px solid #dadce0;
	font-family: 'Poppins';
	max-height: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	font-size: 14px;
	background: #fff;
	font-weight: 500;
	padding: 4px 10px 4px 20px;
	min-width: 70px;
	border-radius: 32px;
	cursor: pointer;
}

.selected {
	color: #5f6368;
}

.select button:focus {
	background: #e7f1fd !important;
	border: 1px solid #1a73e8;
}

.select button:focus .selected {
	color: #1a73e8 !important;
}

.options-container {
	position: absolute;
	top: 100%;
	margin-top: 10px;
	left: 0;
	font-size: 16px;
	background: #fff;
	min-width: 216px;
	height: 263px;
	overflow: hidden;
	opacity: 0;
	transition: all 0.18s ease;
	transform-origin: 0% 0%;
	transform: scale(0);
	z-index: 10;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
	border-radius: 8px;
}

.test {
	opacity: 1;
	transform: scale(1);
}

.options {
	font-family: 'Roboto';
	float: left;
	padding: 10px 0px;
	min-width: 216px;
	height: 293px;
	font-weight: 400;
	font-size: 16px;
	overflow: auto;
	color: #3c4043;
}

.option {
	text-align: left;
	padding: 8px 16px;
	background: #fff;
}

.option:hover {
	background: rgba(0, 0, 0, 0.04);
}

/* width */
::-webkit-scrollbar {
	width: 5px;
	padding: 0px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #dadce0;
	border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.select button:hover {
	background: rgba(26, 115, 232, 0.04);
}

.select:hover .selected {
	color: #1a73e8;
}
.ripple {
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 99;
	border-radius: 32px;
}

.select .arrow {
	color: #1a73e8;
}
</style>
