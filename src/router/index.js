import { createRouter, createWebHistory } from 'vue-router';
import Poems from '@/views/Poems.vue';
import Poem from '@/views/Poem.vue';
import Rankings from '@/views/Rankings.vue';
import Profile from '@/views/Profile.vue';

const routes = [
	{
		path: '/',
		name: 'Poems',
		component: Poems,
	},
	{
		path: '/poems/:id',
		name: 'Poem',
		component: Poem,
	},
	{
		path: '/rankings',
		name: 'Ranking',
		component: Rankings,
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile,
	},
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	// },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
