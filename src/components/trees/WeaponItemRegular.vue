<script lang="ts" setup>
import type {TWeapon, TMeleeData} from '@/interfaces/Weapons'
import {computed} from 'vue'
import WeaponSharpnessBar from './WeaponSharpnessBar.vue'
import WeaponSlots from './WeaponSlots.vue'
import {Icon} from '@iconify/vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<TMeleeData>
	elementStripeClasses?: string
	dimmed?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
	dimmed: false,
})

const stripeColor = computed(() => {
	const elem = props.weapon.data.element || 'none'
	if (elem === 'none') return 'bg-primary-900 hover:bg-primary-900/70'
	return `bg-element-${elem.toLowerCase()}`
})
const rarityColor = computed(() => {
	return `text-rarity-${props.weapon.data.rarity}`
})
</script>

<template>
	<div
		class="rounded-md select-none transition-all duration-200 w-full h-full bg-primary-700 relative"
		:class="{'opacity-25': props.dimmed}"
	>
		<!-- Left Element stripe -->
		<div
			class="absolute left-0 inset-y-0 w-1.5 rounded-l-md bg-linear-0"
			:class="props.elementStripeClasses || stripeColor"
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

					<slot name="element2"></slot>
				</div>

				<slot name="extras"></slot>

				<!-- Melee sharpness -->
				<div class="flex justify-between items-center">
					<div
						class="rounded-sm p-1 flex flex-col gap-0.5 w-min bg-primary-900"
					>
						<WeaponSharpnessBar :sharpness="props.weapon.data.sharpness" />
						<WeaponSharpnessBar :sharpness="props.weapon.data.sharpness_plus" />
						<WeaponSharpnessBar
							:sharpness="props.weapon.data.sharpness_plus2"
						/>
					</div>

					<WeaponSlots :slots="props.weapon.data.slots" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
