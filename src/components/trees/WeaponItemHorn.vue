<script lang="ts" setup>
import type {TWeapon, THuntingHornData} from '@/interfaces/Weapons'
import WeaponItemRegular from './WeaponItemRegular.vue'
import WeaponHornNotes from './WeaponHornNotes.vue'

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<THuntingHornData>
}
const props = withDefaults(defineProps<IProps>(), {})
</script>

<template>
	<WeaponItemRegular :weapon="props.weapon">
		<template #extras>
			<WeaponHornNotes :notes="props.weapon.data.notes" class="mb-1" />
		</template>
	</WeaponItemRegular>
</template>

<style scoped></style>
