<script lang="ts" setup>
import {Icon} from '@iconify/vue'

const props = defineProps<{
	label: string
	icon?: string
	imageSrc?: string
	iconClass?: string
	routeName?: string
	active?: boolean
}>()
const emit = defineEmits<{
	(e: 'click'): void
}>()
</script>

<template>
	<router-link
		:to="{name: props.routeName ?? ''}"
		@click="emit('click')"
		class="appLink relative"
		:active="props.active === true"
	>
		<div
			class="group font-semibold flex gap-3 items-center pl-3 h-10 hover:bg-primary-800 transition-colors 0.2s mr-2 ease rounded-tr-md rounded-br-md"
		>
			<Icon
				v-if="props.icon"
				:icon="props.icon"
				class="text-2xl transition-colors group-hover:text-accent-400"
				:class="`${(props.iconClass ?? '', props.active ? 'text-accent-500' : 'text-contrast-500')}`"
			/>
			<img
				v-else-if="props.imageSrc"
				:src="'/icons/'+props.imageSrc"
				alt="Icon"
				class="w-6 h-6 transition-colors group-hover:text-accent-400"
				:class="`${(props.iconClass ?? '', props.active ? 'text-accent-500' : 'text-contrast-500')}`"
			/>
			<span class="tracking-wider transition-opacity 0.2s ease-out">{{
				props.label
			}}</span>
		</div>
	</router-link>
</template>

<style scoped>
.appLink:hover::before {
	top: 12px;
	bottom: 12px;
}
.appLink[active='true']::before {
	top: 0;
	bottom: 0;
	background-color: var(--color-accent-500);
}
.appLink::before {
	content: '';
	position: absolute;
	transition:
		top 0.1s linear,
		bottom 0.1s linear,
		background-color 0.2s linear;
	left: 0;
	top: 50%;
	bottom: 50%;
	height: auto;
	width: 5px;
	background-color: var(--color-accent-400);
	border-radius: 0 5px 5px 0;
}
</style>
