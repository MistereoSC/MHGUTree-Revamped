<script lang="ts" setup>
import type {TBowgunData, TWeapon} from '@/interfaces/Weapons'
import WeaponItemRanged from './WeaponItemRanged.vue'

const props = defineProps<{
	weapon: TWeapon<TBowgunData>
}>()

function getAmmoString(ammoName: string) {
	switch (ammoName) {
		case 'nrm':
			return 'Normal'
		case 'prc':
			return 'Pierce'
		case 'pel':
			return 'Pellet'
		case 'crg':
			return 'Crag'
		case 'cls':
			return 'Cluster'
		case 'rcv':
			return 'Recover'
		case 'psn':
			return 'Poison'
		case 'par':
			return 'Paralysis'
		case 'sle':
			return 'Sleep'
		case 'exh':
			return 'Exhaust'
		case 'fir':
			return 'Fire'
		case 'wat':
			return 'Water'
		case 'thu':
			return 'Thunder'
		case 'ice':
			return 'Ice'
		case 'dra':
			return 'Dragon'
		default:
			return ammoName
	}
}

function getAmmoArray(ammo: string | string[]) {
	if (typeof ammo === 'string') return [ammo]
	return ammo
}
</script>

<template>
	<WeaponItemRanged :weapon="props.weapon">
		<template #tooltip>
			<div>
				<div class="grid grid-cols-3 grid-rows-3 gap-y-2 text-xs">
					<div
						v-for="(val, name, index) in props.weapon.data.ammo"
						:key="index"
					>
						<span
							class="font-semibold text-gray-300 tracking-wide uppercase"
							:class="{
								'text-gray-500':
									val == '0' ||
									(typeof val !== 'string' &&
										val.every((ammo: string) => ammo.startsWith('0'))),
							}"
						>
							{{ getAmmoString(name) }}
						</span>
						<div class="flex gap-1">
							<span
								v-for="(ammo, aIdx) in getAmmoArray(val)"
								:key="aIdx"
								:class="{
									'text-blue-400': ammo.endsWith('*'),
									'text-gray-500': ammo.startsWith('0'),
								}"
							>
								{{ ammo.replace('*', '') }}
							</span>
						</div>
					</div>
				</div>
				<div class="w-full h-px bg-primary-500 my-3"></div>
				<div class="grid grid-cols-2">
					<div class="flex flex-col items-center">
						<p
							class="uppercase tracking-wider text-xs text-gray-300 font-semibold"
						>
							Special
						</p>
						<div>
							<div
								v-for="(item, index) in props.weapon.data.special_ammo"
								:key="index"
								class="text-blue-300"
							>
								{{ item }}
							</div>
						</div>
					</div>
					<div class="flex flex-col items-center">
						<p
							class="uppercase tracking-wider text-xs text-gray-300 font-semibold"
						>
							Rapid
						</p>
						<div>
							<div
								v-for="(item, index) in props.weapon.data.rapid_fire"
								:key="index"
								class="text-blue-300"
							>
								{{ item }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #extras>
			<div>
				<div class="flex items-center gap-2">
					<span class="text-xs text-gray-300 w-[9ch]">Deviation</span>
					<span class="text-xs text-blue-300">{{
						props.weapon.data.deviation
					}}</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs text-gray-300 w-[9ch]">Recoil</span>
					<span class="text-xs text-blue-300">{{
						props.weapon.data.recoil
					}}</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs text-gray-300 w-[9ch]">Reload</span>
					<span class="text-xs text-blue-300">{{
						props.weapon.data.reload_speed
					}}</span>
				</div>
			</div>
		</template>
	</WeaponItemRanged>
</template>

<style lang="scss" scoped></style>
