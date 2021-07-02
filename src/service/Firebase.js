import 'firebase/firestore';
import firebase from 'firebase';

import userHandler from '@/modules/user-handler.js';

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

const postScore = async ({ data }) => {
	const { email, uid } = userHandler.getUserInfo.value;
	const response = await db.collection('scores').add({ email, uid, ...data });
	return response;
};

const getHighscores = async ({ id }) => {
	const snapshot = await firebase
		.firestore()
		.collection('scores')
		.where('poemId', '==', id)
		.orderBy('score', 'desc')
		.limit(10)
		.get();

	return snapshot.docs.map((doc) => doc.data());
};

const getUserScores = async () => {
	const { uid } = userHandler.getUserInfo.value;
	const snapshot = await firebase
		.firestore()
		.collection('scores')
		.where('uid', '==', uid)
		.get();

	return snapshot.docs.map((doc) => doc.data());
};

export default { getHighscores, getUserScores, postScore };
