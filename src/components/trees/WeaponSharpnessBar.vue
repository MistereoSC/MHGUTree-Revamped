<script lang="ts" setup>
import {onMounted} from 'vue'
const MAX_SHARPNESS_TOTAL = 45

interface IProps {
	sharpness: [number, number, number, number, number, number, number]

	heightPx?: number
	widthMulti?: number
	bgClass?: string
}
const props = withDefaults(defineProps<IProps>(), {
	widthMulti: 3,
	heightPx: 5,
	bgClass: 'bg-primary-900',
})
onMounted(() => {
	return
})

const getBgClass = (index: number) => {
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'white', 'purple']
	return `bg-sharpness-${colors[index]}`
}
</script>

<template>
	<div
		class="flex"
		:style="{
			height: `${$props.heightPx}px`,
			width: `${MAX_SHARPNESS_TOTAL * props.widthMulti}px`,
		}"
		:class="props.bgClass"
	>
		<span
			v-for="(value, index) in $props.sharpness"
			:key="index"
			:class="getBgClass(index)"
			:style="{
				width: `${value * props.widthMulti}px`,
			}"
		></span>
	</div>
</template>

<style lang="scss" scoped></style>
