import { ref, watch } from 'vue';

const userInfo = ref({});

const authenticated = ref(false);

const setUserInfo = (...args) => {
	userInfo.value = args[0];
};

const getUserInfo = () => userInfo.value;

const setAuthenticated = () => (authenticated.value = true);

const unsetAuthenticated = () => (authenticated.value = false);

const isAuthenticated = () => authenticated.value;

watch(
	() => authenticated.value,
	(authenticated) => {
		if (!authenticated) userInfo.value = '';
	}
);

export default { setUserInfo, getUserInfo, authenticated, setAuthenticated, unsetAuthenticated, isAuthenticated };
