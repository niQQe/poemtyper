import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VWave from 'v-wave';
import VueAxios from 'vue-axios';
import firebase from 'firebase';

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

createApp(App)
	.use(router)
	.use(VWave)
	.use(VueAxios, axios)
	.mount('#app');
