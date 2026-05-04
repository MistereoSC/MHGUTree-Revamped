<script setup lang="ts">
import AppMainMenu from './components/navigation/AppMainMenu.vue'
</script>

<template>
	<div class="min-w-screen min-h-screen grid grid-cols-[auto_1fr]">
		<AppMainMenu />
		<div class="h-screen overflow-y-auto scrollable relative">
			<img
				src="/background.png"
				alt="Background"
				class="absolute inset-0 w-full h-full opacity-25 object-fill"
			/>
			<RouterView />
		</div>
	</div>
</template>

<style scoped></style>
