<script lang="ts" setup>
import type {TWeapon, TPhialWeaponData} from '@/interfaces/Weapons'
import WeaponItemRegular from './WeaponItemRegular.vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<TPhialWeaponData>
	dimmed?: boolean
}
const props = withDefaults(defineProps<IProps>(), {dimmed: false})
</script>

<template>
	<WeaponItemRegular :weapon="props.weapon" :dimmed="props.dimmed">
		<template #extras>
			<div class="flex items-center">
				<img
					:src="`/icons/phials/${props.weapon.data.phial.toLowerCase().replace('power', 'impact')}.png`"
					alt="Attack"
					class="inline w-5 h-5"
				/>
				<span class="tracking-wider font-semibold">{{
					props.weapon.data.phial
				}}</span>
			</div>
		</template>
	</WeaponItemRegular>
</template>

<style scoped></style>
