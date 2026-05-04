<script lang="ts" setup>
import type {TBowData, TWeapon} from '@/interfaces/Weapons'
import WeaponItemRanged from './WeaponItemRanged.vue'

const props = defineProps<{
	weapon: TWeapon<TBowData>
}>()

function getCoatingName(index: number) {
	switch (index) {
		case 0:
			return 'Power 1'
		case 1:
			return 'Power 2'
		case 2:
			return 'Element 1'
		case 3:
			return 'Element 2'
		case 4:
			return 'Close'

		case 5:
			return 'Poison'
		case 6:
			return 'Paralysis'
		case 7:
			return 'Sleep'
		case 8:
			return 'Exhaust'
		case 9:
			return 'Blast'
		default:
			return 'Unknown'
	}
}

function getCoatingColor(index: number) {
	switch (index) {
		case 0:
		case 1:
		case 4:
			return 'text-element-none'
		case 2:
		case 3:
			return 'text-element-fire'
		case 5:
			return 'text-element-poison'
		case 6:
			return 'text-element-paralysis'
		case 7:
			return 'text-element-sleep'
		case 8:
			return 'text-element-exhaust'
		case 9:
			return 'text-element-blast'
		default:
			return 'text-element-none'
	}
}

function fillCoatingArray(coatings: boolean[]) {
	const filled = [...coatings]
	while (filled.length < 10) {
		filled.unshift(false)
	}
	return filled
}
</script>

<template>
	<WeaponItemRanged :weapon="props.weapon">
		<template #tooltip>
			<div class="grid grid-cols-5">
				<div class="col-span-2">
					<div>
						<p class="tracking-wider uppercase font-semibold pb-0.5">Charges</p>
						<div
							v-for="(item, index) in props.weapon.data.charges"
							:key="index"
							class="text-blue-300 pl-1"
							:class="{'text-gray-400': item.endsWith('*')}"
						>
							{{ item.replace('*', '') }}
						</div>
					</div>
				</div>
				<div class="col-span-3">
					<p
						class="tracking-wider uppercase font-semibold text-center pr-5 pb-0.5"
					>
						Coatings
					</p>
					<div class="grid grid-cols-2 grid-rows-5 grid-flow-col gap-x-1">
						<div
							v-for="(value, index) in fillCoatingArray(
								props.weapon.data.coatings
							)"
							:key="index"
							class="text-blue-300"
							:class="{
								'text-gray-600': !value,
								[getCoatingColor(index)]: value,
							}"
						>
							<span>{{ getCoatingName(index) }}</span>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template #extras>
			<div class="flex items-center gap-2">
				<span class="text-xs text-gray-400"> Arc Shot</span>
				<span
					class="text-xs text-blue-300 font-semibold tracking-wide uppercase"
					>{{ props.weapon.data.arc_shot }}</span
				>
			</div>
		</template>
	</WeaponItemRanged>
</template>

<style lang="scss" scoped></style>
