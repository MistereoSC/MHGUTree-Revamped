<script lang="ts" setup>
import {ref} from 'vue'
import RAW_DATA from '@/json/cb.json'
import WeaponTree from '@/components/trees/WeaponTree.vue'
import LazyRender from '@/components/common/LazyRender.vue'
import type {
	TPhialWeaponData,
	TWeapon,
	TWeaponCluster,
} from '@/interfaces/Weapons'
import LoaderSpinner from '@/components/common/LoaderSpinner.vue'
import WeaponItemPhial from '@/components/trees/WeaponItemPhial.vue'

const items = RAW_DATA as unknown as TWeaponCluster<TPhialWeaponData>[]
const anyRevealed = ref(false)
</script>

<template>
	<div class="relative h-screen">
		<div
			class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
		>
			<LoaderSpinner :visible="!anyRevealed" />
		</div>
		<div class="overflow-auto h-full scrollable py-4 px-8">
			<div v-for="(cluster, idx) in items" :key="idx" class="mb-8">
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

					<WeaponTree :cluster="cluster" :node-height="104">
						<template #default="{item}">
							<!-- prettier-ignore -->
							<WeaponItemPhial :weapon="(item as unknown as TWeapon<TPhialWeaponData>)" />
						</template>
					</WeaponTree>
				</LazyRender>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
