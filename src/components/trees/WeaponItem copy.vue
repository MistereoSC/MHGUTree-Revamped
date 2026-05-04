<script lang="ts" setup>
import type {
	TWeapon,
	TWeaponDataAny,
	TBowData,
	TBowgunData,
	TPhialWeaponData,
	TDualbladesData,
	TGunlanceData,
	THuntingHornData,
	TMeleeData,
} from '@/interfaces/Weapons'
import {computed, ref} from 'vue'
import WeaponSharpnessBar from './WeaponSharpnessBar.vue'
import WeaponSlots from './WeaponSlots.vue'

// ── Type guards ────────────────────────────────────────────────────────────
type TWithSharpness =
	| TMeleeData
	| TPhialWeaponData
	| TDualbladesData
	| TGunlanceData
	| THuntingHornData

function hasSharpness(d: TWeaponDataAny): d is TWithSharpness {
	return 'sharpness' in d
}
function isPhialWeapon(d: TWeaponDataAny): d is TPhialWeaponData {
	return 'phial' in d
}
function isDualblades(d: TWeaponDataAny): d is TDualbladesData {
	return 'element_2' in d
}
function isGunlance(d: TWeaponDataAny): d is TGunlanceData {
	return 'shelling_type' in d
}
function isHuntingHorn(d: TWeaponDataAny): d is THuntingHornData {
	return 'notes' in d
}
function isBow(d: TWeaponDataAny): d is TBowData {
	return 'charges' in d
}
function isBowgun(d: TWeaponDataAny): d is TBowgunData {
	return 'ammo' in d
}

// ── Props ──────────────────────────────────────────────────────────────────
interface IProps {
	weapon: TWeapon<TWeaponDataAny>
}
const props = withDefaults(defineProps<IProps>(), {})

// ── Narrowed computed refs ─────────────────────────────────────────────────
const sharpnessData = computed(() =>
	hasSharpness(props.weapon.data) ? props.weapon.data : null
)
const phialData = computed(() =>
	isPhialWeapon(props.weapon.data) ? props.weapon.data : null
)
const dualbladesData = computed(() =>
	isDualblades(props.weapon.data) ? props.weapon.data : null
)
const gunlanceData = computed(() =>
	isGunlance(props.weapon.data) ? props.weapon.data : null
)
const huntingHornData = computed(() =>
	isHuntingHorn(props.weapon.data) ? props.weapon.data : null
)
const bowData = computed(() =>
	isBow(props.weapon.data) ? props.weapon.data : null
)
const bowgunData = computed(() =>
	isBowgun(props.weapon.data) ? props.weapon.data : null
)

const hovered = ref(false)

const stripeColor = computed(() => {
	if (
		dualbladesData.value &&
		dualbladesData.value.element_2 &&
		props.weapon.data.element
	) {
		const elem1 = props.weapon.data.element
		const elem2 = dualbladesData.value.element_2
		const color1 = `element-${elem1.toLowerCase()}`
		const color2 = `element-${elem2.toLowerCase()}`
		return `from-${color1} to-${color2} hover:from-${color1}/70 hover:to-${color2}/70`
	}

	const elem = props.weapon.data.element || 'none'
	if (elem === 'none') return 'bg-primary-900 hover:bg-primary-900/70'
	return `bg-element-${elem.toLowerCase()} hover:bg-element-${elem.toLowerCase()}/70`
})
const rarityColor = computed(() => {
	return `bg-rarity-${props.weapon.data.rarity}`
})
</script>

<template>
	<div
		class="rounded-md cursor-pointer select-none transition-shadow w-full h-full bg-primary-700 hover:bg-primary-600 group relative"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
	>
		<!-- Left rarity stripe -->
		<div
			class="absolute left-0 inset-y-0 w-1.5 rounded-l-md bg-linear-0"
			:class="stripeColor"
		/>

		<!-- Main content -->
		<div class="">
			<div class="flex flex-col justify-center h-full pl-3 pr-2 py-1">
				<!-- Name & Rarity Pip -->
				<div class="flex justify-between items-center">
					<span class="text-sm font-bold tracking-wider truncate">
						{{ props.weapon.data.name }}
					</span>
					<span :class="rarityColor" class="w-2.5 h-2.5 rounded-full"></span>
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
						<span class="text-sm leading-none">{{
							props.weapon.data.defense
						}}</span>
					</div>
					<!-- Affinity -->
					<div class="flex items-center">
						<img
							:src="`/icons/aff.png`"
							alt="Affinity"
							class="inline w-4 h-4"
						/>
						<span class="text-sm leading-none">{{
							props.weapon.data.affinity
						}}</span>
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

					<!-- Dual Blades Second Element -->
					<div
						v-if="dualbladesData && dualbladesData.element_2"
						class="flex gap-1"
					>
						<img
							:src="`/icons/status/${dualbladesData.element_2.toLowerCase()}.png`"
							:alt="dualbladesData.element_2"
							class="inline w-4 h-4"
						/>
						<span class="text-sm leading-none">{{
							dualbladesData.element_2_attack
						}}</span>
					</div>
				</div>

				<div>
					<!-- Phial type -->
					<div v-if="phialData">
						<span>{{ phialData.phial }}</span>
					</div>

					<!-- Gunlance shelling -->
					<div v-if="gunlanceData">
						<span>{{ gunlanceData.shelling_type }}</span>
					</div>

					<!-- Hunting Horn notes -->
					<div v-if="huntingHornData" class="flex gap-0.5">
						<img
							v-for="note in huntingHornData.notes"
							:key="note"
							:src="`/icons/notes/${note}.png`"
							:alt="note"
							class="inline w-5 h-5"
						/>
					</div>

					<!-- Bow charges/coatings -->
					<div v-if="bowData">
						<span>{{ bowData.charges }}</span>
					</div>

					<!-- Bowgun special ammo -->
					<div v-if="bowgunData">
						<span>{{ bowgunData.special_ammo.join(', ') }}</span>
					</div>
				</div>

				<!-- Melee sharpness -->
				<div v-if="sharpnessData" class="flex justify-between items-center">
					<div
						class="rounded-sm p-1 flex flex-col gap-0.5 w-min bg-primary-900"
					>
						<WeaponSharpnessBar :sharpness="sharpnessData.sharpness" />
						<WeaponSharpnessBar :sharpness="sharpnessData.sharpness_plus" />
						<WeaponSharpnessBar :sharpness="sharpnessData.sharpness_plus2" />
					</div>

					<WeaponSlots :slots="props.weapon.data.slots" />
				</div>
			</div>
		</div>
		<!-- Hover tooltip -->
		<Transition name="fade">
			<div
				v-if="hovered"
				class="absolute z-10 left-0 top-full mt-1 w-48 rounded-md bg-gray-800 border border-gray-600 p-2 text-[11px] text-gray-100 shadow-xl pointer-events-none"
			>
				<p class="font-semibold mb-1">{{ props.weapon.data.name }}</p>
				<p>ATK: {{ props.weapon.data.attack }}</p>
				<p v-if="props.weapon.data.element">
					{{ props.weapon.data.element }}:
					{{ props.weapon.data.element_attack }}
				</p>
				<p>Affinity: {{ props.weapon.data.affinity }}%</p>
				<p v-if="props.weapon.data.defense">
					Defense: {{ props.weapon.data.defense }}
				</p>
				<p>Slots: {{ props.weapon.data.slots }}</p>
				<p v-if="dualbladesData">
					{{ dualbladesData.element_2 }}: {{ dualbladesData.element_2_attack }}
				</p>
				<p v-if="phialData">Phial: {{ phialData.phial }}</p>
				<p v-if="gunlanceData">Shelling: {{ gunlanceData.shelling_type }}</p>
				<p v-if="bowData">Charges: {{ bowData.charges }}</p>
				<p v-if="bowgunData">Deviation: {{ bowgunData.deviation }}</p>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.12s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
