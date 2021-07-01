import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VWave from 'v-wave';
import VueAxios from 'vue-axios';


createApp(App)
	.use(router)
	.use(VWave)
	.use(VueAxios, axios)
	.mount('#app');
