<script lang="ts" setup>
const weapons = [
	{label: 'Sword & Shield', routeName: 'Sword', icon: 'weapons/sns.png'},
	{label: 'Dualblades', routeName: 'Dualblades', icon: 'weapons/db.png'},
	{label: 'Greatsword', routeName: 'Greatsword', icon: 'weapons/gs.png'},
	{label: 'Longsword', routeName: 'Longsword', icon: 'weapons/ls.png'},
	{label: 'Hammer', routeName: 'Hammer', icon: 'weapons/h.png'},
	{label: 'Hunting Horn', routeName: 'Horn', icon: 'weapons/hh.png'},
	{label: 'Lance', routeName: 'Lance', icon: 'weapons/l.png'},
	{label: 'Gunlance', routeName: 'Gunlance', icon: 'weapons/gl.png'},
	{label: 'Chargeblade', routeName: 'Chargeblade', icon: 'weapons/cb.png'},
	{label: 'Switch Axe', routeName: 'Switchaxe', icon: 'weapons/sa.png'},
	{label: 'Insect Glaive', routeName: 'glaive', icon: 'weapons/ig.png'},
	{label: 'Light Bowgun', routeName: 'Lightbowgun', icon: 'weapons/lbg.png'},
	{label: 'Heavy Bowgun', routeName: 'Heavybowgun', icon: 'weapons/hbg.png'},
	{label: 'Bow', routeName: 'Bow', icon: 'weapons/b.png'},
]
</script>

<template>
	<div class="relative z-10 p-8 flex flex-col gap-8 h-full">
		<div class="grid place-items-center h-full">
			<div class="grid grid-cols-5 gap-4">
				<router-link
					v-for="weapon in weapons"
					:key="weapon.routeName"
					:to="{name: weapon.routeName}"
					class="group bg-primary-800/70 border border-primary-700 rounded-xl p-5 flex flex-col items-center gap-3 hover:bg-primary-700/80 hover:border-accent-500 transition-all duration-200 cursor-pointer backdrop-blur-sm min-w-72"
				>
					<img
						:src="'/icons/' + weapon.icon"
						:alt="weapon.label"
						class="w-12 h-12 group-hover:scale-110 transition-transform duration-200"
					/>
					<span
						class="text-sm font-semibold tracking-wide text-contrast-600 group-hover:text-accent-400 transition-colors text-center leading-tight"
					>
						{{ weapon.label }}
					</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
