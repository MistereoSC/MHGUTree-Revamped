<script lang="ts" setup>
const props = defineProps<{
	visible: boolean
}>()
</script>

<template>
	<Transition name="fade">
		<div v-if="props.visible">
			<svg
				class="animate-spin w-12 h-12 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
				/>
			</svg>
		</div>
	</Transition>
</template>

<style lang="scss" scoped></style>
