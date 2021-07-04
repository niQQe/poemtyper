import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/database';

import userHandler from '@/modules/user-handler.js';
import { ref } from 'vue';

var firebaseConfig = {
	apiKey: 'AIzaSyByUoAxLg34GJy0f1xM8y7yp7cDfIV6kDw',
	authDomain: 'poemtyper.firebaseapp.com',
	projectId: 'poemtyper',
	storageBucket: 'poemtyper.appspot.com',
	messagingSenderId: '526714892607',
	appId: '1:526714892607:web:49292af93ba51c2e50638a',
	measurementId: 'G-CZ89QRP2R3',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshot: true, merge: true });

const realTimeScores = ref([]);

db.collection('scores')
	.orderBy('date', 'desc')
	.onSnapshot((doc) => {
		realTimeScores.value = doc.docs.map((doc) => doc.data());
	});

const postScore = async ({ data }) => {
	const { email, uid } = userHandler.getUserInfo.value;
	const response = await db.collection('scores').add({ email, uid, ...data });
	return response;
};

const postScoreToUser = async ({ data }) => {
	const { email } = userHandler.getUserInfo.value;

	const userRef = db.collection('users').doc(email);

	const existingData = (await userRef.get()).data();

	if (!existingData) {
		userRef.set({ [data.poemName]: [data] });
		return;
	}
	if (existingData[data.poemName]) {
		existingData[data.poemName].push(data);
		userRef.set({ ...existingData });
	} else {
		const newData = { ...existingData, [data.poemName]: [data] };
		userRef.set({ ...newData });
	}
};

const getHighscores = async ({ id }) => {
	const snapshot = await db
		.collection('scores')
		.where('poemId', '==', id)
		.orderBy('score', 'desc')
		.get();

	console.log(snapshot);

	return snapshot.docs.map((doc) => doc.data());
};

const getUserScores = async () => {
	const { email } = userHandler.getUserInfo.value;
	return (
		await db
			.collection('users')
			.doc(email)
			.get()
	).data();
};

export default { getHighscores, getUserScores, postScore, postScoreToUser, realTimeScores };
