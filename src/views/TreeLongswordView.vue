<script lang="ts" setup>
import {ref, computed} from 'vue'
import RAW_DATA from '@/json/ls.json'
import WeaponTree from '@/components/trees/WeaponTree.vue'
import LazyRender from '@/components/common/LazyRender.vue'
import type {TMeleeData, TWeapon, TWeaponCluster} from '@/interfaces/Weapons'
import WeaponItemRegular from '@/components/trees/WeaponItemRegular.vue'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import WeaponFilterPanel from '@/components/trees/WeaponFilterPanel.vue'
import type {TWeaponFilter} from '@/components/trees/WeaponFilterPanel.vue'
import {Icon} from '@iconify/vue'

const items = RAW_DATA as unknown as TWeaponCluster<TMeleeData>[]
const anyRevealed = ref(false)

// ── Filter state ──────────────────────────────────────────────────────────────
const currentFilter = ref<TWeaponFilter>({
	minAtk: 0,
	minDef: 0,
	minElemAtk: 0,
	minAffinity: -100,
	element: 'any',
	slots: '0+',
	sharpness: 'any',
	shellingType: 'any',
	phialType: 'any',
	notes: [],
})

const isFilterActive = computed(() => {
	const f = currentFilter.value
	return (
		f.minAtk > 0 ||
		f.minDef > 0 ||
		f.minElemAtk > 0 ||
		f.minAffinity > -100 ||
		f.element !== 'any' ||
		f.slots !== '0+' ||
		f.sharpness !== 'any'
	)
})

function matchesFilter(weapon: TWeapon<TMeleeData>, f: TWeaponFilter): boolean {
	if (weapon.data.attack < f.minAtk) return false
	if (weapon.data.defense < f.minDef) return false
	if (weapon.data.element_attack < f.minElemAtk) return false
	if (Number(weapon.data.affinity) < f.minAffinity) return false

	if (f.element !== 'any') {
		if (f.element === 'none') {
			if (weapon.data.element !== '') return false
		} else {
			if (weapon.data.element.toLowerCase() !== f.element) return false
		}
	}

	if (f.slots === '1+' && weapon.data.slots < 1) return false
	if (f.slots === '2+' && weapon.data.slots < 2) return false
	if (f.slots === '3' && weapon.data.slots !== 3) return false

	if (f.sharpness !== 'any') {
		const sharp = weapon.data.sharpness
		if (f.sharpness === 'green+' && sharp[3] === 0) return false
		if (f.sharpness === 'blue+' && sharp[4] === 0) return false
		if (f.sharpness === 'white+' && sharp[5] === 0) return false
		if (f.sharpness === 'purple' && sharp[6] === 0) return false
	}

	return true
}

const matchedIds = computed<Set<number> | null>(() => {
	if (!isFilterActive.value) return null
	const set = new Set<number>()
	for (const cluster of items) {
		for (const weapon of cluster.items) {
			if (matchesFilter(weapon, currentFilter.value)) set.add(weapon.id)
		}
	}
	return set
})

const visibleClusters = computed(() => {
	if (!isFilterActive.value || matchedIds.value === null) return items
	return items.filter((cluster) =>
		cluster.items.some((w) => matchedIds.value!.has(w.id))
	)
})
</script>

<template>
	<div class="relative h-screen">
		<div
			class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
		>
			<LoaderSpinner :visible="!anyRevealed" />
		</div>
		<div class="overflow-auto h-full scrollable py-4 px-8">
			<div
				v-if="isFilterActive && visibleClusters.length === 0"
				class="flex flex-col items-center justify-center gap-3 h-48 text-gray-400"
			>
				<Icon icon="material-symbols:search-rounded" class="text-4xl" />
				<span class="text-base font-medium"
					>No weapons match the current filters.</span
				>
			</div>
			<div v-for="(cluster, idx) in visibleClusters" :key="idx" class="mb-8">
				<LazyRender min-height="200px" @revealed="anyRevealed = true">
					<div
						class="w-full text-left px-4 rounded bg-gray-800 flex items-center gap-2"
					>
						<span class="text-lg font-semibold"
							>{{ cluster.items[0]!.data.name.split(' ')[0] }} Tree</span
						>
						<span class="text-sm text-gray-400 pt-1">
							{{ cluster.items.length }} Weapons
						</span>
					</div>

					<WeaponTree :cluster="cluster">
						<template #default="{item}">
							<!-- prettier-ignore -->
							<WeaponItemRegular :weapon="(item as unknown as TWeapon<TMeleeData>)" :dimmed="isFilterActive && !matchedIds?.has(item.id)" />
						</template>
					</WeaponTree>
				</LazyRender>
			</div>
		</div>
		<div class="absolute bottom-6 left-4">
			<WeaponFilterPanel @update:filter="currentFilter = $event" />
		</div>
	</div>
</template>

<style scoped></style>
