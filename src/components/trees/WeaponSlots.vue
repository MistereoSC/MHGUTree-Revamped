<script lang="ts" setup>
const props = defineProps<{
	slots: number
}>()
</script>

<template>
	<div class="flex gap-[6px]">
		<div v-for="i in 3" :key="i" class="w-3.5 h-3.5">
			<div
				class="w-3.5 h-3.5 rounded-full border-dotted border-gray-500 border-1"
				v-if="props.slots <= i"
			></div>
			<div class="w-3.5 h-3.5 rounded-full bg-gray-300" v-else></div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
