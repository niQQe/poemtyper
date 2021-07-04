import axios from 'axios';

import { ref, computed } from 'vue';

const poems = ref([]);
const searchString = ref('');

const latestScores = ref([]);
const getPoems = async () => {
	const res = await axios.get('https://poetrydb.org/author,title/Shakespeare;Sonnet');
	poems.value = res.data.map((poemdata, index) => (poemdata = { id: index, ...poemdata }));
};

const getSinglePoem = (id) => poems.value.find((poem) => poem.id == id);

const poemsAmount = computed(() => poems.value.length);

const filteredPoems = computed(() => {
	if (!searchString.value.length > 3) return poems.value;
	return poems.value.filter((poem) => {
		const text = poem.lines.reduce((allText, line) => {
			allText += line;
			return allText;
		}, '');

		return text.toLowerCase().includes(searchString.value.toLowerCase()) || poem.title.toLowerCase().includes(searchString.value.toLowerCase());
	});
});

export default { poemsAmount, getPoems, getSinglePoem, filteredPoems, searchString, latestScores };
