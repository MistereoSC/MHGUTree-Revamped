<script lang="ts" setup>
import {ref, computed} from 'vue'
import {Icon} from '@iconify/vue'
import type {TNote} from '@/interfaces/Weapons'

export type TWeaponFilter = {
	minAtk: number
	minDef: number
	minElemAtk: number
	minAffinity: number
	element: string
	slots: string
	sharpness: string
	shellingType: string
	phialType: string
	notes: TNote[]
}

const DEFAULT_FILTER: TWeaponFilter = {
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
}

const emit = defineEmits<{
	'update:filter': [filter: TWeaponFilter]
}>()

interface IProps {
	showShelling?: boolean
	phialOptions?: string[]
	showNotes?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
	showShelling: false,
	phialOptions: () => [],
	showNotes: false,
})

const isOpen = ref(false)
// draft: what the user is editing inside the panel
const draft = ref<TWeaponFilter>({...DEFAULT_FILTER})
// applied: what's actually driving the filter outside
const applied = ref<TWeaponFilter>({...DEFAULT_FILTER})

function clamp(val: number, min: number, max: number): number {
	if (Number.isNaN(val)) return min
	return Math.max(min, Math.min(max, val))
}

function updateStat(key: 'minAtk' | 'minDef' | 'minElemAtk', event: Event) {
	draft.value[key] = clamp(
		Number((event.target as HTMLInputElement).value),
		0,
		999
	)
}

function updateAffinity(event: Event) {
	draft.value.minAffinity = clamp(
		Number((event.target as HTMLInputElement).value),
		-100,
		100
	)
}

function applyFilter() {
	applied.value = {...draft.value}
	emit('update:filter', {...applied.value})
}

function resetFilter() {
	draft.value = {...DEFAULT_FILTER}
	applied.value = {...DEFAULT_FILTER}
	emit('update:filter', {...DEFAULT_FILTER})
}

const activeFilterCount = computed(() => {
	const f = applied.value
	let count = 0
	if (f.minAtk > 0) count++
	if (f.minDef > 0) count++
	if (f.minElemAtk > 0) count++
	if (f.minAffinity > -100) count++
	if (f.element !== 'any') count++
	if (f.slots !== '0+') count++
	if (f.sharpness !== 'any') count++
	if (f.shellingType !== 'any') count++
	if (f.phialType !== 'any') count++
	if (f.notes.length > 0) count++
	return count
})

const ALL_ELEMENTS = [
	{value: 'fire', label: 'Fire'},
	{value: 'water', label: 'Water'},
	{value: 'thunder', label: 'Thunder'},
	{value: 'ice', label: 'Ice'},
	{value: 'dragon', label: 'Dragon'},
	{value: 'poison', label: 'Poison'},
	{value: 'sleep', label: 'Sleep'},
	{value: 'paralysis', label: 'Para'},
	{value: 'blastblight', label: 'Blast'},
]

const SLOTS_OPTIONS = ['0+', '1+', '2+', '3']

const SHARPNESS_OPTIONS = [
	{value: 'any', label: 'Any', color: ''},
	{value: 'green+', label: 'Green+', color: 'bg-sharpness-green'},
	{value: 'blue+', label: 'Blue+', color: 'bg-sharpness-blue'},
	{value: 'white+', label: 'White+', color: 'bg-sharpness-white'},
	{value: 'purple', label: 'Purple', color: 'bg-sharpness-purple'},
]

const SHELLING_OPTIONS = ['Any', 'Normal', 'Long', 'Wide']

const NOTE_OPTIONS: {value: TNote; label: string; color: string}[] = [
	{value: 'R', label: 'Red', color: 'text-red-500'},
	{value: 'G', label: 'Green', color: 'text-green-500'},
	{value: 'B', label: 'Blue', color: 'text-blue-500'},
	{value: 'W', label: 'White', color: 'text-white'},
	{value: 'P', label: 'Purple', color: 'text-purple-500'},
	{value: 'O', label: 'Orange', color: 'text-orange-500'},
	{value: 'Y', label: 'Yellow', color: 'text-yellow-500'},
	{value: 'A', label: 'Aqua', color: 'text-cyan-500'},
]

function toggleNote(note: TNote) {
	if (draft.value.notes.includes(note)) {
		draft.value.notes = draft.value.notes.filter((n) => n !== note)
	} else {
		draft.value.notes = [...draft.value.notes, note]
	}
}
</script>

<template>
	<div class="relative w-12 h-12">
		<!-- FAB (closed state) -->
		<Transition name="fab">
			<button
				v-if="!isOpen"
				class="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-accent-600 hover:bg-accent-500 active:bg-accent-700 flex items-center justify-center shadow-xl transition-colors cursor-pointer"
				@click="isOpen = true"
			>
				<Icon icon="tabler:filter" class="text-white w-6 h-6" />
				<span
					v-if="activeFilterCount > 0"
					class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-400 text-black text-[10px] font-bold flex items-center justify-center"
				>
					{{ activeFilterCount }}
				</span>
			</button>
		</Transition>

		<!-- Panel (open state) -->
		<Transition name="panel">
			<div
				v-if="isOpen"
				class="absolute bottom-0 left-0 bg-primary-800 border border-primary-600 rounded-2xl shadow-2xl w-96 max-h-[80vh] overflow-y-auto flex flex-col gap-3 p-4"
			>
				<!-- Header -->
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Icon icon="tabler:filter" class="text-accent-400 w-5 h-5" />
						<span class="font-semibold text-sm">Filters</span>
					</div>
					<button
						class="text-gray-400 hover:text-white transition-colors cursor-pointer"
						@click="isOpen = false"
					>
						<Icon icon="tabler:x" class="w-5 h-5" />
					</button>
				</div>

				<div class="h-px bg-primary-600" />

				<!-- Stat filters -->
				<div class="flex flex-col gap-2">
					<!-- ATK -->
					<div class="flex items-center gap-2">
						<img src="/icons/atk.png" alt="Attack" class="w-4 h-4 shrink-0" />
						<span class="text-xs text-gray-400 w-16 shrink-0">Attack ≥</span>
						<input
							type="number"
							:value="draft.minAtk"
							min="0"
							max="999"
							class="no-spinner flex-1 min-w-0 bg-primary-900 border border-primary-600 focus:border-accent-500 outline-none rounded px-2 py-1 text-sm text-right"
							@input="updateStat('minAtk', $event)"
						/>
					</div>
					<!-- DEF -->
					<div class="flex items-center gap-2">
						<img src="/icons/def.png" alt="Defense" class="w-4 h-4 shrink-0" />
						<span class="text-xs text-gray-400 w-16 shrink-0">Defense ≥</span>
						<input
							type="number"
							:value="draft.minDef"
							min="0"
							max="999"
							class="no-spinner flex-1 min-w-0 bg-primary-900 border border-primary-600 focus:border-accent-500 outline-none rounded px-2 py-1 text-sm text-right"
							@input="updateStat('minDef', $event)"
						/>
					</div>
					<!-- ELEM -->
					<div class="flex items-center gap-2">
						<img
							src="/icons/status/paralysis.png"
							alt="Element"
							class="w-4 h-4 shrink-0"
						/>
						<span class="text-xs text-gray-400 w-16 shrink-0">Element ≥</span>
						<input
							type="number"
							:value="draft.minElemAtk"
							min="0"
							max="999"
							class="no-spinner flex-1 min-w-0 bg-primary-900 border border-primary-600 focus:border-accent-500 outline-none rounded px-2 py-1 text-sm text-right"
							@input="updateStat('minElemAtk', $event)"
						/>
					</div>
					<!-- AFF -->
					<div class="flex items-center gap-2">
						<img src="/icons/aff.png" alt="Affinity" class="w-4 h-4 shrink-0" />
						<span class="text-xs text-gray-400 w-16 shrink-0">Affinity ≥</span>
						<input
							type="number"
							:value="draft.minAffinity"
							min="-100"
							max="100"
							class="no-spinner flex-1 min-w-0 bg-primary-900 border border-primary-600 focus:border-accent-500 outline-none rounded px-2 py-1 text-sm text-right"
							@input="updateAffinity($event)"
						/>
					</div>
				</div>

				<div class="h-px bg-primary-600" />

				<!-- Element filter -->
				<div class="flex flex-col gap-1.5">
					<span class="text-xs text-gray-400 font-medium">Element</span>
					<div class="flex flex-wrap gap-y-1 gap-x-2">
						<button
							class="px-1 py-1 rounded text-xs transition-colors cursor-pointer"
							:class="
								draft.element === 'any'
									? 'bg-accent-600 text-white'
									: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
							"
							@click="draft.element = 'any'"
						>
							Any
						</button>
						<button
							class="px-1 py-1 rounded text-xs transition-colors cursor-pointer"
							:class="
								draft.element === 'none'
									? 'bg-accent-600 text-white'
									: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
							"
							@click="draft.element = 'none'"
						>
							None
						</button>
						<button
							v-for="elem in ALL_ELEMENTS"
							:key="elem.value"
							class="flex items-center gap-1 px-1 py-1 rounded text-xs transition-colors cursor-pointer"
							:class="
								draft.element === elem.value
									? 'bg-accent-600 text-white'
									: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
							"
							@click="draft.element = elem.value"
						>
							<img
								:src="`/icons/status/${elem.value}.png`"
								:alt="elem.label"
								class="w-3.5 h-3.5"
							/>
							{{ elem.label }}
						</button>
					</div>
				</div>

				<div class="h-px bg-primary-600" />

				<!-- Slots filter -->
				<div class="flex flex-col gap-1.5">
					<span class="text-xs text-gray-400 font-medium">Slots</span>
					<div class="flex gap-1">
						<button
							v-for="slot in SLOTS_OPTIONS"
							:key="slot"
							class="flex-1 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
							:class="
								draft.slots === slot
									? 'bg-accent-600 text-white'
									: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
							"
							@click="draft.slots = slot"
						>
							{{ slot }}
						</button>
					</div>
				</div>

				<div class="h-px bg-primary-600" />

				<!-- Sharpness filter -->
				<div class="flex flex-col gap-1.5">
					<span class="text-xs text-gray-400 font-medium">Sharpness</span>
					<div class="flex flex-wrap gap-1">
						<button
							v-for="opt in SHARPNESS_OPTIONS"
							:key="opt.value"
							class="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
							:class="
								draft.sharpness === opt.value
									? 'bg-accent-600 text-white'
									: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
							"
							@click="draft.sharpness = opt.value"
						>
							<span
								v-if="opt.color"
								class="w-2.5 h-2.5 rounded-sm shrink-0"
								:class="opt.color"
							/>
							{{ opt.label }}
						</button>
					</div>
				</div>

				<!-- Shelling type filter (Gunlance only) -->
				<template v-if="props.showShelling">
					<div class="h-px bg-primary-600" />
					<div class="flex flex-col gap-1.5">
						<span class="text-xs text-gray-400 font-medium">Shelling Type</span>
						<div class="flex gap-1">
							<button
								v-for="opt in SHELLING_OPTIONS"
								:key="opt"
								class="flex-1 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
								:class="
									draft.shellingType === opt.toLowerCase()
										? 'bg-accent-600 text-white'
										: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
								"
								@click="draft.shellingType = opt.toLowerCase()"
							>
								{{ opt }}
							</button>
						</div>
					</div>
				</template>

				<!-- Phial type filter (Chargeblade / Switchaxe) -->
				<template v-if="props.phialOptions.length > 0">
					<div class="h-px bg-primary-600" />
					<div class="flex flex-col gap-1.5">
						<span class="text-xs text-gray-400 font-medium">Phial</span>
						<div class="flex flex-wrap gap-1">
							<button
								class="px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
								:class="
									draft.phialType === 'any'
										? 'bg-accent-600 text-white'
										: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
								"
								@click="draft.phialType = 'any'"
							>
								Any
							</button>
							<button
								v-for="opt in props.phialOptions"
								:key="opt"
								class="px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
								:class="
									draft.phialType === opt.toLowerCase()
										? 'bg-accent-600 text-white'
										: 'bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700'
								"
								@click="draft.phialType = opt.toLowerCase()"
							>
								<img
									:src="`/icons/phials/${opt.toLowerCase().replace('power', 'impact')}.png`"
									class="inline w-4 h-4"
								/>
								{{ opt }}
							</button>
						</div>
					</div>
				</template>

				<!-- Notes filter (Hunting Horn) -->
				<template v-if="props.showNotes">
					<div class="h-px bg-primary-600" />
					<div class="flex flex-col gap-1.5">
						<span class="text-xs text-gray-400 font-medium">Notes</span>
						<div class="grid grid-cols-8 gap-1">
							<button
								v-for="opt in NOTE_OPTIONS"
								:key="opt.value"
								class="flex items-center justify-center gap-1 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
								:class="
									draft.notes.includes(opt.value)
										? 'bg-primary-600 ring-1 ring-accent-500'
										: 'bg-primary-900 text-gray-400 hover:bg-primary-700'
								"
								@click="toggleNote(opt.value)"
							>
								<Icon icon="mdi:music-note" :class="['text-base', opt.color]" />
								<!-- <span :class="opt.color">{{ opt.label }}</span> -->
							</button>
						</div>
					</div>
				</template>

				<div class="h-px bg-primary-600" />

				<!-- Footer actions -->
				<div class="flex gap-2">
					<button
						class="flex-1 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer bg-primary-900 text-gray-400 hover:text-white hover:bg-primary-700"
						@click="resetFilter"
					>
						Reset
						<span v-if="activeFilterCount > 0" class="opacity-70"
							>({{ activeFilterCount }})</span
						>
					</button>
					<button
						class="flex-2 py-1.5 px-4 rounded text-xs font-semibold transition-colors cursor-pointer bg-accent-600 hover:bg-accent-500 text-white"
						@click="applyFilter"
					>
						Apply
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
/* Hide native number input spinners */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.no-spinner {
	-moz-appearance: textfield;
	appearance: textfield;
}

/* Panel: expand from bottom-left corner */
.panel-enter-active {
	transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	transform-origin: bottom left;
}
.panel-leave-active {
	transition: all 0.15s ease-in;
	transform-origin: bottom left;
}
.panel-enter-from,
.panel-leave-to {
	opacity: 0;
	transform: scale(0.7);
}

/* FAB: simple fade + scale */
.fab-enter-active,
.fab-leave-active {
	transition: all 0.15s ease;
}
.fab-enter-from,
.fab-leave-to {
	opacity: 0;
	transform: scale(0.5);
}
</style>
