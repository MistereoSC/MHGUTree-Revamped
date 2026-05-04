import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('@/views/AboutView.vue'),
		},

		// Weapon trees
		{
			path: '/weapons/sword',
			name: 'Sword',
			component: () => import('@/views/TreeSwordAndShieldView.vue'),
		},
		{
			path: '/weapons/dualblades',
			name: 'Dualblades',
			component: () => import('@/views/TreeDualbladesView.vue'),
		},

		{
			path: '/weapons/greatsword',
			name: 'Greatsword',
			component: () => import('@/views/TreeGreatswordView.vue'),
		},
		{
			path: '/weapons/longsword',
			name: 'Longsword',
			component: () => import('@/views/TreeLongswordView.vue'),
		},
		{
			path: '/weapons/hammer',
			name: 'Hammer',
			component: () => import('@/views/TreeHammerView.vue'),
		},
		{
			path: '/weapons/horn',
			name: 'Horn',
			component: () => import('@/views/TreeHuntingHornView.vue'),
		},
		{
			path: '/weapons/lance',
			name: 'Lance',
			component: () => import('@/views/TreeLanceView.vue'),
		},
		{
			path: '/weapons/gunlance',
			name: 'Gunlance',
			component: () => import('@/views/TreeGunlanceView.vue'),
		},
		{
			path: '/weapons/chargeblade',
			name: 'Chargeblade',
			component: () => import('@/views/TreeChargebladeView.vue'),
		},
		{
			path: '/weapons/switchaxe',
			name: 'Switchaxe',
			component: () => import('@/views/TreeSwitchaxeView.vue'),
		},
		{
			path: '/weapons/glaive',
			name: 'glaive',
			component: () => import('@/views/TreeInsectGlaiveView.vue'),
		},
		{
			path: '/weapons/lightbowgun',
			name: 'Lightbowgun',
			component: () => import('@/views/TreeLightBowgunView.vue'),
		},
		{
			path: '/weapons/heavybowgun',
			name: 'Heavybowgun',
			component: () => import('@/views/TreeHeavyBowgunView.vue'),
		},
		{
			path: '/weapons/bow',
			name: 'Bow',
			component: () => import('@/views/TreeBowView.vue'),
		},
	],
})

export default router
