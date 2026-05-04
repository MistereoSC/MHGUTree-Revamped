/* eslint-disable @typescript-eslint/ban-ts-comment */

export type TWeapon<T> = {
	id: number
	parentId: null | number
	hDepth: number
	vDepth: number
	data: {
		family: number
		name: string
		rarity: number
		attack: number
		affinity: string
		defense: number
		slots: number
		element: string
		element_attack: number
	} & T
}

export type TBowData = {
	arc_shot: string
	charges: string
	coatings: [
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
		boolean,
	]
}
export type TBowgunData = {
	deviation: number
	reload_speed: string
	recoil: string
	special_ammo: string[]
	rapid_fire: string[]
	ammo: TAmmo
}
export type TPhialWeaponData = {
	phial: string
} & TSharpness
export type TDualbladesData = {
	element_2: string
	element_2_attack: number
} & TSharpness
export type TGunlanceData = {
	shelling_type: string
} & TSharpness
export type THuntingHornData = {
	notes: TNote[]
} & TSharpness
export type TMeleeData = TSharpness

type TSharpness = {
	sharpness: [number, number, number, number, number, number, number]
	sharpness_plus: [number, number, number, number, number, number, number]
	sharpness_plus2: [number, number, number, number, number, number, number]
}
type TAmmo = {
	nrm: [string, string, string]
	prc: [string, string, string]
	pel: [string, string, string]
	crg: [string, string, string]
	cls: [string, string, string]
	rcv: [string, string]
	psn: [string, string]
	par: [string, string]
	sle: [string, string]
	exh: [string, string]
	fir: string
	wat: string
	thn: string
	ice: string
	dra: string
}

export type TWeaponDataAny =
	| TBowData
	| TBowgunData
	| TPhialWeaponData
	| TDualbladesData
	| TGunlanceData
	| THuntingHornData
	| TMeleeData

export type TNote = 'R' | 'G' | 'B' | 'W' | 'P' | 'O' | 'Y' | 'A'
// ---------------------------------------------------------------

export type TWeaponCluster<T> = {
	families: number[]
	items: TWeapon<T>[]
}

export function clusterItems<T>(items: TWeapon<T>[]): TWeaponCluster<T>[] {
	// ── Build lookup structures ────────────────────────────────────────────────
	const childrenOf = new Map<number, number[]>()
	const itemById = new Map<number, TWeapon<T>>()

	for (const item of items) {
		itemById.set(item.id, item)
		if (!childrenOf.has(item.id)) childrenOf.set(item.id, [])
		if (item.parentId !== null) {
			if (!childrenOf.has(item.parentId)) childrenOf.set(item.parentId, [])
			childrenOf.get(item.parentId)!.push(item.id)
		}
	}

	const roots = items.filter((i) => i.parentId === null)

	// ── Main-chain extraction: always follow the child with the smallest ID ──────
	function getMainChain(startId: number): number[] {
		const chain: number[] = [startId]
		let current = startId
		for (;;) {
			const children = childrenOf.get(current) ?? []
			if (children.length === 0) break
			const mainChild = Math.min(...children)
			chain.push(mainChild)
			current = mainChild
		}
		return chain
	}

	// ── Recursive depth assignment ─────────────────────────────────────────────
	// Layout rule:
	//   • The main chain of the current subtree occupies `vDepth`.
	//   • Side branches are processed from the END of the main chain to the
	//     START (i.e. branches that fork off latest get the lowest vDepths).
	//   • Sub-branches of a branch are assigned immediately after that branch,
	//     before moving to the next sibling branch.
	// Returns the next free vertical depth after placing this entire subtree.
	function assignDepths(
		chainRootId: number,
		hOffset: number,
		vDepth: number,
		result: Map<number, {horizontal_depth: number; vertical_depth: number}>
	): number {
		const mainChain = getMainChain(chainRootId)

		// Place every node on the main chain
		for (let i = 0; i < mainChain.length; i++) {
			result.set(mainChain[i]!, {
				horizontal_depth: hOffset + i,
				vertical_depth: vDepth,
			})
		}

		let nextVDepth = vDepth + 1

		// Walk main chain from end → start so latest forks get lower vDepths
		for (let i = mainChain.length - 1; i >= 0; i--) {
			const nodeId = mainChain[i]!
			const children = childrenOf.get(nodeId) ?? []
			const mainContinuation = mainChain[i + 1] // undefined at leaf
			const sideChildren = children
				.filter((c) => c !== mainContinuation)
				.sort((a, b) => a - b)

			for (const sideChild of sideChildren) {
				nextVDepth = assignDepths(
					sideChild,
					hOffset + i + 1,
					nextVDepth,
					result
				)
			}
		}

		return nextVDepth
	}

	// ── Build one TClusterReturn per root ─────────────────────────────────────
	return roots.map((root) => {
		const depthMap = new Map<
			number,
			{horizontal_depth: number; vertical_depth: number}
		>()
		assignDepths(root.id, 0, 0, depthMap)

		const families: number[] = []
		const resultItems: TWeaponCluster<T>['items'] = []

		for (const [id, depths] of depthMap) {
			const item = itemById.get(id)! as TWeapon<T>
			if (!families.includes(item.data!.family))
				families.push(item.data!.family)

			// @ts-ignore
			delete item.globalVDepth
			// @ts-ignore
			delete item.relativeVDepth

			item.hDepth = depths.horizontal_depth
			item.vDepth = depths.vertical_depth

			resultItems.push(item)
		}

		// console.log({families, items: resultItems})
		return {families, items: resultItems as TWeapon<T>[]}
	})
}
