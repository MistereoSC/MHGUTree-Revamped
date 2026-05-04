<script lang="ts" setup>
import type {TNote} from '@/interfaces/Weapons'
import {Icon} from '@iconify/vue'

const props = defineProps<{
	notes?: TNote[]
}>()

function getNoteColor(note: TNote) {
	switch (note) {
		case 'R':
			return 'text-red-500'
		case 'G':
			return 'text-green-500'
		case 'B':
			return 'text-blue-500'
		case 'W':
			return 'text-white'
		case 'P':
			return 'text-purple-500'
		case 'O':
			return 'text-orange-500'
		case 'Y':
			return 'text-yellow-500'
		case 'A':
			return 'text-aqua-500'
		default:
			return ''
	}
}
</script>

<template>
	<div class="flex">
		<div v-for="note in props.notes" :key="note">
			<Icon icon="mdi:music-note" :class="['text-xl', getNoteColor(note)]" />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
