<script lang="ts" setup>
import type {TWeapon, TWeaponDataAny} from '@/interfaces/Weapons'
import {computed, ref} from 'vue'
import {Icon} from '@iconify/vue'
import WeaponSlots from './WeaponSlots.vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<TWeaponDataAny>
}
const props = withDefaults(defineProps<IProps>(), {})

const stripeColor = computed(() => {
	const elem = props.weapon.data.element || 'none'
	if (elem === 'none') return 'bg-primary-900 hover:bg-primary-900/70'
	return `bg-element-${elem.toLowerCase()}`
})
const rarityColor = computed(() => {
	return `text-rarity-${props.weapon.data.rarity}`
})

const hovered = ref(false)
</script>

<template>
	<div
		class="rounded-md select-none transition-shadow w-full h-full bg-primary-700 hover:bg-primary-600 group relative cursor-pointer"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
	>
		<!-- Left Element stripe -->
		<div
			class="absolute left-0 inset-y-0 w-1.5 rounded-l-md bg-linear-0 group-hover:opacity-70"
			:class="stripeColor"
		/>

		<!-- Main content -->
		<div class="">
			<div class="flex flex-col justify-center h-full pl-3 pr-2 py-1">
				<!-- Name & Rarity Pip -->
				<div class="flex justify-between items-center">
					<span class="text-sm font-bold tracking-wider truncate">
						{{ props.weapon.data.name }}
					</span>
					<Icon icon="tabler:diamond-filled" :class="rarityColor"></Icon>
				</div>

				<!-- Core Stats -->
				<div class="flex gap-2 items-center my-1">
					<!-- Attack -->
					<div class="flex items-center">
						<img :src="`/icons/atk.png`" alt="Attack" class="inline w-4 h-4" />
						<span class="text-sm leading-none">{{
							props.weapon.data.attack
						}}</span>
					</div>
					<!-- Defense -->
					<div class="flex items-center">
						<img :src="`/icons/def.png`" alt="Defense" class="inline w-4 h-4" />
						<span
							class="text-sm leading-none"
							:class="{
								'text-green-400': props.weapon.data.defense > 0,
							}"
							>{{ props.weapon.data.defense }}</span
						>
					</div>
					<!-- Affinity -->
					<div class="flex items-center">
						<img
							:src="`/icons/aff.png`"
							alt="Affinity"
							class="inline w-4 h-4"
						/>
						<span
							class="text-sm leading-none"
							:class="{
								'text-red-400': props.weapon.data.affinity.startsWith('-'),
								'text-green-400': props.weapon.data.affinity !== '0',
							}"
							>{{ props.weapon.data.affinity }}</span
						>
					</div>
					<!-- Element -->
					<div class="flex items-center" v-if="props.weapon.data.element">
						<img
							:src="`/icons/status/${props.weapon.data.element.toLowerCase()}.png`"
							:alt="props.weapon.data.element"
							class="inline w-4 h-4"
						/>
						<span class="text-sm leading-none">{{
							props.weapon.data.element_attack
						}}</span>
					</div>

					<div class="ml-auto">
						<WeaponSlots :slots="props.weapon.data.slots" />
					</div>
				</div>

				<slot name="extras"></slot>

				<!-- Hover tooltip -->
				<Transition name="fade">
					<div
						v-if="hovered"
						class="absolute z-10 left-2 top-full mt-1 right-0 rounded-md bg-gray-800 border border-gray-600 p-2 text-[11px] text-gray-100 shadow-xl pointer-events-none"
					>
						<slot name="tooltip"></slot>
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
