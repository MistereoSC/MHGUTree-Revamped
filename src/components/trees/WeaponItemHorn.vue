<script lang="ts" setup>
import type {TWeapon, THuntingHornData} from '@/interfaces/Weapons'
import WeaponItemRegular from './WeaponItemRegular.vue'
import WeaponHornNotes from './WeaponHornNotes.vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<THuntingHornData>
	dimmed: boolean
}
const props = withDefaults(defineProps<IProps>(), {dimmed: false})
</script>

<template>
	<WeaponItemRegular :weapon="props.weapon" :dimmed="props.dimmed">
		<template #extras>
			<WeaponHornNotes :notes="props.weapon.data.notes" class="mb-1" />
		</template>
	</WeaponItemRegular>
</template>

<style scoped></style>
