<script setup lang="ts">
import {Icon} from '@iconify/vue'
</script>

<template>
	<div class="w-full h-full grid place-items-center">
		<div
			class="container max-w-max bg-primary-900/60 relative border-y-4 border-secondary-400 p-8"
		>
			<h1
				class="uppercase font-bold text-gray-400 tracking-wide leading-none text-2xl text-center"
			>
				About
			</h1>

			<div class="mt-6 flex flex-col gap-5 text-sm text-gray-300 max-w-prose">
				<div class="flex flex-col gap-1">
					<h2
						class="uppercase text-xs font-bold tracking-widest text-gray-500 mb-1"
					>
						Data Sources
					</h2>
					<p>
						Weapon data is sourced from the
						<a
							href="https://github.com/gatheringhallstudios/MHGenDatabase"
							class="text-secondary-400 hover:text-secondary-300 underline underline-offset-2 transition-colors"
							>MHGU Database</a
						>
						and
						<a
							href="https://mhapi.info/"
							class="text-secondary-400 hover:text-secondary-300 underline underline-offset-2 transition-colors"
							>Poogie's Toolbox</a
						>.
					</p>
				</div>

				<div class="flex flex-col gap-1">
					<h2
						class="uppercase text-xs font-bold tracking-widest text-gray-500 mb-1"
					>
						Disclaimer
					</h2>
					<p class="leading-relaxed">
						Monster Hunter Generations Ultimate is a trademark of
						<span class="font-semibold text-gray-200">Capcom Co., Ltd.</span>
						This site is an independent, fan-made project and is not affiliated
						with, endorsed by, or sponsored by Capcom. All game assets, names,
						and related content are the property of their respective owners.
					</p>
				</div>

				<div class="flex flex-col gap-1">
					<h2
						class="uppercase text-xs font-bold tracking-widest text-gray-500 mb-1"
					>
						Source Code
					</h2>
					<p>
						The source code for this project is available on
						<a
							href="https://github.com/MistereoSC/MHGUTree"
							class="text-secondary-400 hover:text-secondary-300 underline underline-offset-2 transition-colors"
							>GitHub</a
						>.
					</p>
				</div>

				<div class="flex flex-col gap-1">
					<h2
						class="uppercase text-xs font-bold tracking-widest text-gray-500 mb-1"
					>
						Support
					</h2>
					<p>
						If you would like to help keep this site online, you are welcome to
						<a
							href="https://ko-fi.com/mistereosc"
							class="text-secondary-400 hover:text-secondary-300 underline underline-offset-2 transition-colors"
							>buy me a coffee</a
						>.
					</p>
				</div>

				<div class="flex gap-3 items-center justify-center mt-3">
					<a
						href="https://github.com/MistereoSC/MHGUTree-Revamped"
						target="_blank"
						class="text-primary-400 hover:text-purple-400 transition-colors"
						title="GitHub"
					>
						<Icon icon="mdi:github" class="w-7 h-7" />
					</a>
					<a
						href="https://ko-fi.com/mistereosc"
						target="_blank"
						class="text-primary-400 hover:text-red-300 transition-colors"
						title="Ko-Fi"
					>
						<Icon icon="mdi:coffee" class="w-7 h-7" />
					</a>
				</div>
			</div>

			<span class="deco tl"></span>
			<span class="deco tr"></span>
			<span class="deco bl"></span>
			<span class="deco br"></span>
		</div>
	</div>
</template>

<style scoped>
.deco {
	position: absolute;
	width: 24px;
	height: 16px;
	border: var(--color-secondary-400) solid;
	border-width: 0 0 4px 4px;
}
.deco:after {
	content: '';
	position: absolute;
	width: 12px;
	height: 6px;
	border: var(--color-secondary-400) solid;
	border-width: 4px 4px 0 0;
	bottom: 0;
	right: 0;
}
.deco.tl {
	top: 0;
	left: 0;
}
.deco.tr {
	top: 0;
	right: 0;
	transform: scaleX(-1);
}
.deco.bl {
	bottom: 0;
	left: 0;
	transform: scaleX(-1) rotate(180deg);
}
.deco.br {
	bottom: 0;
	right: 0;
	transform: rotate(180deg);
}
</style>
