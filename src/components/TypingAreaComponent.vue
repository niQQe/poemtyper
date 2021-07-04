<template>
	<!-- <div v-if="completed">DONE!</div> -->
	<div style="display:flex;margin:auto;">
		<div class="type-area">
			<div class="info-wrapper" v-if="!understand">
				<div class="info">
					<div>
						Time starts when you type the first correct character.<br />
						You can cancel and reset your run with the ESC-key.<br />
						Login to submit your score.
					</div>
					<div class="understand-button-wrapper">
						<button @click="iUnderstand">I understand</button>
					</div>
				</div>
			</div>
			<div class="poem" :class="[fadeUp ? 'fadeUp' : '']">
				<div v-for="(line, lineIndex) in poemData" :key="lineIndex" class="line">
					<div
						v-for="(char, charIndex) in line"
						:class="[caretPosition(lineIndex, charIndex) ? 'caret' : '', char.correct ? 'correct' : '']"
						:key="charIndex"
						class="char"
					>
						<div v-if="char.char === ' '" class="space"></div>
						<div v-else style="margin:1px;">{{ char.char }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';

import statsHandler from '@/modules/stats-handler.js';

export default {
	name: 'App',
	props: {
		poem: {
			type: Object,
			required: true,
		},
		activeTab: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const {
			minutes,
			seconds,
			milliseconds,
			completed,
			addError,
			resetErrors,
			resetProgressCount,
			resetKeyPressCounter,
			addToProgressCount,
			addKeyPress,
			getCharAmount,
		} = statsHandler;

		const poemData = props.poem.lines.reduce((lines, line) => {
			lines.push(
				line.trim().split``.reduce((chars, char) => {
					chars.push({ char, correct: null });
					return chars;
				}, [])
			);
			return lines;
		}, []);

		const fadeUp = ref(false);

		const currentCharIndex = ref(0);

		const understand = ref(false);

		const iUnderstand = () => {
			understand.value = true;
		};

		const currentLine = ref(0);

		getCharAmount(poemData);

		let intervalTimer;

		const keyIsCorrect = (pressedKey, correctKey) => pressedKey === correctKey;

		const nextChar = () => currentCharIndex.value++;

		const poemCompleted = () => {
			return currentLine.value === poemData.length - 1 && currentCharIndex.value === poemData[poemData.length - 1].length;
		};

		const setCorrect = (currentChar) => (currentChar.correct = true);

		const setCompleted = () => (completed.value = true);

		const addEventListener = () => window.addEventListener('keydown', keyHandler);

		const removeEventListener = () => window.removeEventListener('keydown', keyHandler);

		const clearIntervalTimer = () => clearInterval(intervalTimer);

		const setNewLine = () => currentLine.value++;

		const endOfLine = () => currentCharIndex.value === poemData[currentLine.value].length;

		const resetCurrentCharIndex = () => (currentCharIndex.value = 0);

		const resetCurrentLine = () => (currentLine.value = 0);

		const keyIsNotValid = (key) => key.length != 1 && key != 'Space' && key != 'Escape' && key != '½';

		const abortKey = (key) => key === 'Escape';

		const resetMinutes = () => (minutes.value = 0);

		const resetSeconds = () => (seconds.value = 0);

		const resetMilliseconds = () => (milliseconds.value = 0);

		const resetTimer = () => {
			resetMinutes();
			resetSeconds();
			resetMilliseconds();
		};

		const resetCompleted = () => (completed.value = false);

		const resetCorrects = () => poemData.forEach((line) => line.forEach((char) => (char.correct = false)));

		const caretPosition = (lineIndex, charIndex) => currentLine.value === lineIndex && currentCharIndex.value === charIndex;

		const resetChallenge = async () => {
			resetCurrentCharIndex();
			resetCurrentLine();
			resetProgressCount();
			resetCorrects();
			resetCompleted();
			resetTimer();
			resetKeyPressCounter();
			resetErrors();
			clearIntervalTimer();
		};

		const keyHandler = (e) => {
			e.preventDefault();
			if (completed.value && abortKey(e.key)) {
				resetChallenge();
				return;
			}
			if (keyIsNotValid(e.key)) return;

			if (abortKey(e.key)) {
				resetChallenge();
				return;
			}

			if (e.key == '½') {
				setCompleted();
				clearIntervalTimer();
			}

			const pressedKey = e.key;
			const currentChar = poemData[currentLine.value][currentCharIndex.value];

			/** TYPING AND ERROR HANDLING */
			if (keyIsCorrect(pressedKey, currentChar.char)) {
				addToProgressCount();
				setCorrect(currentChar);
				addKeyPress();
				nextChar();
			} else {
				/**
				 * Start counting errors when user have get the first key correct
				 */
				if (currentCharIndex.value > 0) addError();
				return;
			}

			if (poemCompleted()) {
				setCompleted();
				clearIntervalTimer();
				return;
			}

			/** NEW LINE HANDLING */
			if (endOfLine()) {
				setNewLine();
				resetCurrentCharIndex();
			}
		};

		/** Prevent the user from typing when highscore is viewed */
		watch(
			() => props.activeTab,
			(value) => {
				if (value === 'highscore') removeEventListener();
				else addEventListener();
			}
		);

		/**
		 * Start the timer when user starts
		 */
		watch(
			() => currentCharIndex.value,
			(value) => {
				if (value === 1 && currentLine.value == 0) {
					intervalTimer = setInterval(() => {
						milliseconds.value += 1;
						if (milliseconds.value === 100) {
							seconds.value++;
							milliseconds.value = 0;
						}
						if (seconds.value === 60) {
							seconds.value = 0;
							minutes.value++;
						}
					}, 10);
				}
			}
		);

		/** START KEY LISTENER ON MOUNTED */
		onMounted(() => {
			addEventListener();
			setTimeout(() => {
				fadeUp.value = true;
			}, 10);
		});

		/**
		 * Reset challenge if component is destroyed (not on the current route)
		 */
		onBeforeUnmount(async () => {
			resetCurrentCharIndex();
			resetCurrentLine();
			resetProgressCount();
			resetCorrects();
			resetCompleted();
			resetTimer();
			resetKeyPressCounter();
			resetErrors();
			clearIntervalTimer();
			removeEventListener();
		});

		return {
			poemData,
			caretPosition,
			completed,
			fadeUp,
			iUnderstand,
			understand,
		};
	},
};
</script>

<style scoped>
.caret {
	animation: marker 1s linear infinite forwards;
}

@keyframes marker {
	0% {
		box-shadow: -3px 0px 0px 0px rgb(49, 49, 49);
	}
	50% {
		box-shadow: -3px 0px 0px 0px rgb(49, 49, 49);
	}
	51% {
		box-shadow: -3px 0px 0px 0px rgb(49, 49, 49, 0);
	}
	100% {
		box-shadow: -3px 0px 0px 0px rgb(49, 49, 49, 0);
	}
}

.correct {
	background: #97fd91;
	color: #000;
}

.fadeUp {
	transform: translateY(0) !important;
	opacity: 1 !important;
}

.space {
	width: 12px;
	margin-left: 2px;
}

.poem {
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	transform: translateY(10px);
	opacity: 0;
	float: left;
	width: 100%;
	padding: 0px 3px;
	margin-top: 10px;
}

.timer {
	font-size: 52px;
}

.type-area-wrapper {
	background: #fff;
	padding: 15px 0px;
	float: left;
	display: flex;
}

.type-area {
	margin-top: 5px;
	position: relative;
	flex: 1.6;
	display: flex;
}

.line {
	font-family: 'Poppins';
	width: 100%;
	float: left;
	color: #666;
}

.info-wrapper {
	position: absolute;
	background: rgba(255, 255, 255, 0.712);
	z-index: 10;
	width: 100%;
	display: flex;
	height: 100%;
	left: 0px;
	top: 10px;
	font-size: 13px;
	font-weight: 500;
}

.understand-button-wrapper {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}

.understand-button-wrapper button {
	border: none;
	font-family: 'Poppins';
	font-weight: 500;
	padding: 5px 10px;
	background: #1a73e8;
	border-radius: 4px;
	color: #fff;
	font-size: 13px;
}

.understand-button-wrapper button:hover {
	cursor: pointer;
	background: #165bb6;
}

.info {
	background: #fff;
	padding: 20px;
	margin: auto auto auto 150px;
	border: 1px solid #e2e2e2;
	border-radius: 8px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.247);
}

.char {
	float: left;
	font-size: 20px;
	height: 25px;
}

.status {
	color: #222;
	font-weight: 400;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	float: left;
	width: 100%;
	padding-right: 20px;
}

.tabular-nums {
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
}

.bg-red {
	background: #ee3532;
}

@media only screen and (min--moz-device-pixel-ratio: 2),
	only screen and (-o-min-device-pixel-ratio: 2/1),
	only screen and (-webkit-min-device-pixel-ratio: 2),
	only screen and (min-device-pixel-ratio: 2) {
	.char {
		background-size: 100px 100px;
		/* rest of your styles... */
	}
}
</style>
