import { ref, computed } from 'vue';

const keyPressCounter = ref(0);

const charAmount = ref(0);

const minutes = ref(0);

const seconds = ref(0);

const milliseconds = ref(0);

const progressCount = ref(0);

const completed = ref(false);

const errors = ref(0);

const addError = () => errors.value++;

const resetErrors = () => (errors.value = 0);

const resetProgressCount = () => (progressCount.value = 0);

const resetKeyPressCounter = () => (keyPressCounter.value = 0);

const addToProgressCount = () => progressCount.value++;

const addKeyPress = () => keyPressCounter.value++;

const getCharAmount = (poem) => {
	charAmount.value = poem.reduce((totalChars, line) => {
		totalChars += line.length;
		return totalChars;
	}, 0);
};

const progressCounter = computed(() => `${progressCount.value}/${charAmount.value}`);

const accuracy = computed(() => {
	if (errors.value === 0 && keyPressCounter.value == 0) return 0;
	return (100 - (errors.value / (keyPressCounter.value + errors.value)) * 100).toFixed(1);
});

const timer = computed(() => {
	const fixedMinutes = minutes.value > 9 ? minutes.value : '0' + minutes.value;
	const fixedSeconds = seconds.value > 9 ? seconds.value : '0' + seconds.value;
	const fixedMilliseconds = milliseconds.value > 9 ? milliseconds.value : '0' + milliseconds.value;

	return `${fixedMinutes}:${fixedSeconds}:${fixedMilliseconds}`;
});

export default {
	minutes,
	seconds,
	milliseconds,
	progressCount,
	completed,
	errors,
	addError,
	resetErrors,
	resetProgressCount,
	resetKeyPressCounter,
	addToProgressCount,
	addKeyPress,
	getCharAmount,
	progressCounter,
	accuracy,
	timer,
};
