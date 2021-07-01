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

export const postService = async ({ collection, data }) => {
	const { email, uid } = userHandler.getUserInfo();
	const response = await db.collection(collection).add({ email, uid, ...data });
	console.log(response);
};
export const getService = async ({ collection, id }) => {
	console.log(id);
	const snapshot = await firebase
		.firestore()
		.collection(collection)
		.where('poemId', '==', id)
		.get();
	return snapshot.docs.map((doc) => doc.data());
};
