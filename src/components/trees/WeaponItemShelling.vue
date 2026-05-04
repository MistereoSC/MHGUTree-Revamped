<script lang="ts" setup>
import type {TWeapon, TGunlanceData} from '@/interfaces/Weapons'
import WeaponItemRegular from './WeaponItemRegular.vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<TGunlanceData>
	dimmed: boolean
}
const props = withDefaults(defineProps<IProps>(), {dimmed: false})
</script>

<template>
	<WeaponItemRegular :weapon="props.weapon" :dimmed="props.dimmed">
		<template #extras>
			<div class="flex items-center">
				<img
					:src="`/icons/shells/${props.weapon.data.shelling_type.split(' ')[0]!.toLowerCase()}.png`"
					alt="Attack"
					class="inline w-5 h-5"
				/>
				<span class="tracking-wider font-semibold">{{
					props.weapon.data.shelling_type
				}}</span>
			</div>
		</template>
	</WeaponItemRegular>
</template>

<style scoped></style>
