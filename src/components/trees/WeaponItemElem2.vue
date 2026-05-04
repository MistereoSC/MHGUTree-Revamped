<script lang="ts" setup>
import type {TWeapon, TDualbladesData} from '@/interfaces/Weapons'
import WeaponItemRegular from './WeaponItemRegular.vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<TDualbladesData>
}
const props = withDefaults(defineProps<IProps>(), {})

function getStripeColor() {
	if (!props.weapon.data.element_2) {
		return undefined
	}
	const elem = props.weapon.data.element || 'none'
	if (elem === 'none') return 'bg-primary-900 hover:bg-primary-900/70'
	return `bg-linear-0 from-element-${elem.toLowerCase()} to-element-${props.weapon.data.element_2.toLowerCase()}`
}
</script>

<template>
	<WeaponItemRegular
		:weapon="props.weapon"
		:element-stripe-classes="getStripeColor()"
	>
		<template #element2>
			<div v-if="props.weapon.data.element_2" class="flex items-center gap-1">
				<img
					:src="`/icons/status/${props.weapon.data.element_2!.toLowerCase()}.png`"
					:alt="props.weapon.data.element_2"
					class="inline w-4 h-4"
				/>
				<span class="text-sm leading-none">{{
					props.weapon.data.element_2_attack
				}}</span>
			</div>
		</template>
	</WeaponItemRegular>
</template>

<style scoped></style>
