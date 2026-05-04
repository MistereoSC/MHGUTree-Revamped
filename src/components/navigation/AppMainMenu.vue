<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import AppMainMenuLink from './AppMainMenuLink.vue'
import {Icon} from '@iconify/vue'

const route = useRoute()
const activeRoute = computed(() => route.name as string)
</script>

<template>
	<div class="relative">
		<div
			class="bg-primary-900 w-48 h-full grid grid-rows-[auto_1fr_auto] shadow-lg py-2 overflow-x-hidden"
			style="transition: width 0.2s ease-out"
		>
			<router-link
				:to="{name: 'Home'}"
				class="flex items-center ml-2 gap-2 mb-4 select-none cursor-pointe group"
			>
				<!-- Display the favicon.ico logo in the public folder -->
				<img src="/favicon.ico" alt="Logo" class="w-8 h-8" />
				<h1
					class="font-bold tracking-wider text-lg t 0.2s ease-out group-hover:text-accent-400 transition-colors"
				>
					MHGUTree
				</h1>
			</router-link>
			<div>
				<!-- <AppMainMenuLink
					label="Home"
					icon="material-symbols:home"
					route-name="Home"
					:active="activeRoute === 'Home'"
				/> -->
				<div class="w-full h-px bg-primary-500 mb-2"></div>
				<AppMainMenuLink
					label="Sword & Shield"
					image-src="weapons/sns.png"
					route-name="Sword"
					:active="activeRoute === 'Sword'"
				/>
				<AppMainMenuLink
					label="Dualblades"
					image-src="weapons/db.png"
					route-name="Dualblades"
					:active="activeRoute === 'Dualblades'"
				/>
				<AppMainMenuLink
					label="Greatsword"
					image-src="weapons/gs.png"
					route-name="Greatsword"
					:active="activeRoute === 'Greatsword'"
				/>
				<AppMainMenuLink
					label="Longsword"
					image-src="weapons/ls.png"
					route-name="Longsword"
					:active="activeRoute === 'Longsword'"
				/>
				<AppMainMenuLink
					label="Hammer"
					image-src="weapons/h.png"
					route-name="Hammer"
					:active="activeRoute === 'Hammer'"
				/>
				<AppMainMenuLink
					label="Hunting Horn"
					image-src="weapons/hh.png"
					route-name="Horn"
					:active="activeRoute === 'Horn'"
				/>
				<AppMainMenuLink
					label="Lance"
					image-src="weapons/l.png"
					route-name="Lance"
					:active="activeRoute === 'Lance'"
				/>
				<AppMainMenuLink
					label="Gunlance"
					image-src="weapons/gl.png"
					route-name="Gunlance"
					:active="activeRoute === 'Gunlance'"
				/>
				<AppMainMenuLink
					label="Chargeblade"
					image-src="weapons/cb.png"
					route-name="Chargeblade"
					:active="activeRoute === 'Chargeblade'"
				/>
				<AppMainMenuLink
					label="Switchaxe"
					image-src="weapons/sa.png"
					route-name="Switchaxe"
					:active="activeRoute === 'Switchaxe'"
				/>
				<AppMainMenuLink
					label="Insect Glaive"
					image-src="weapons/ig.png"
					route-name="glaive"
					:active="activeRoute === 'glaive'"
				/>
				<div class="w-full h-px bg-primary-500 my-2"></div>
				<AppMainMenuLink
					label="Light Bowgun"
					image-src="weapons/lbg.png"
					route-name="Lightbowgun"
					:active="activeRoute === 'Lightbowgun'"
				/>
				<AppMainMenuLink
					label="Heavy Bowgun"
					image-src="weapons/hbg.png"
					route-name="Heavybowgun"
					:active="activeRoute === 'Heavybowgun'"
				/>
				<AppMainMenuLink
					label="Bow"
					image-src="weapons/b.png"
					route-name="Bow"
					:active="activeRoute === 'Bow'"
				/>
			</div>
			<div>
				<div class="w-full h-px bg-primary-500 my-2"></div>
				<AppMainMenuLink
					label="About"
					icon="material-symbols:chat-info-rounded"
					route-name="About"
					:active="activeRoute === 'About'"
				/>
				<div class="flex gap-3 items-center justify-center mt-3">
					<a
						href="https://github.com/MistereoSC/MHGUTree-Revamped"
						target="_blank"
						class="text-primary-400 hover:text-purple-400 transition-colors"
						title="GitHub"
					>
						<Icon icon="mdi:github" class="w-7 h-7" />
					</a>
					<a
						href="https://ko-fi.com/mistereosc"
						target="_blank"
						class="text-primary-400 hover:text-red-300 transition-colors"
						title="Ko-Fi"
					>
						<Icon icon="mdi:coffee" class="w-7 h-7" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
