<script setup lang="ts">
import {computed} from 'vue'
import type {TWeaponCluster, TWeaponDataAny} from '@/interfaces/Weapons'

interface IProps {
	cluster: TWeaponCluster<TWeaponDataAny>
	nodeWidth?: number
	nodeHeight?: number
	nodeVPadding?: number
	nodeHPadding?: number
}
const props = withDefaults(defineProps<IProps>(), {
	nodeWidth: 230,
	nodeHeight: 80,
	nodeVPadding: 15,
	nodeHPadding: 15,
})

// ── Grid constants ────────────────────────────────────────────────────────────

const NODE_W = props.nodeWidth
const NODE_H = props.nodeHeight
const H_PAD = props.nodeHPadding
const V_PAD = props.nodeVPadding
const CELL_W = 2 * H_PAD + NODE_W // px per grid column
const CELL_H = 2 * V_PAD + NODE_H // px per grid row

// ── Position helpers (shared by SVG lines and HTML nodes) ─────────────────────
const nodeLeft = (h: number) => h * CELL_W + H_PAD
const nodeRight = (h: number) => h * CELL_W + H_PAD + NODE_W
const nodeTop = (v: number) => v * CELL_H + V_PAD
const nodeMidY = (v: number) => v * CELL_H + CELL_H / 2
const gateX = (h: number) => (h + 1) * CELL_W

// ── Canvas / container size ───────────────────────────────────────────────────
const totalWidth = computed(() => {
	if (!props.cluster.items.length) return 0
	const maxH = Math.max(...props.cluster.items.map((i) => i.hDepth))
	return nodeRight(maxH) + H_PAD
})
const totalHeight = computed(() => {
	if (!props.cluster.items.length) return 0
	const maxV = Math.max(...props.cluster.items.map((i) => i.vDepth))
	return nodeTop(maxV) + NODE_H + V_PAD
})

// ── Fast position lookup by id ────────────────────────────────────────────────
const posById = computed(() => {
	const m = new Map<number, {h: number; v: number}>()
	for (const item of props.cluster.items) {
		m.set(item.id, {h: item.hDepth, v: item.vDepth})
	}
	return m
})

// ── SVG connector paths ───────────────────────────────────────────────────────
const connections = computed(() =>
	props.cluster.items
		.filter((item) => item.parentId !== null)
		.map((item) => {
			const p = posById.value.get(item.parentId!)!
			const c = posById.value.get(item.id)!
			const px = nodeRight(p.h)
			const py = nodeMidY(p.v)
			const cx = nodeLeft(c.h)
			const cy = nodeMidY(c.v)
			const gate = gateX(p.h)
			return py === cy
				? `M ${px} ${py} H ${cx}`
				: `M ${px} ${py} H ${gate} V ${cy} H ${cx}`
		})
)
</script>

<template>
	<div
		class="relative"
		:style="{width: `${totalWidth}px`, height: `${totalHeight}px`}"
	>
		<!-- ── SVG connector layer (behind nodes, no pointer events) ──────── -->
		<svg
			class="absolute inset-0 pointer-events-none"
			:width="totalWidth"
			:height="totalHeight"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round">
				<path v-for="(d, idx) in connections" :key="`conn-${idx}`" :d="d" />
			</g>
		</svg>

		<!-- ── HTML weapon node cards ─────────────────────────────────────── -->
		<div
			v-for="item in cluster.items"
			:key="item.id"
			class="absolute"
			:style="{
				left: `${nodeLeft(item.hDepth)}px`,
				top: `${nodeTop(item.vDepth)}px`,
				width: `${NODE_W}px`,
				height: `${NODE_H}px`,
			}"
		>
			<slot :item="item"> </slot>
		</div>
	</div>
</template>

<style scoped></style>
