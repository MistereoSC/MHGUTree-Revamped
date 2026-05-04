import {ref} from 'vue'

const expanded = ref(true)
const useMainMenu = () => {
	function toggleMenu(to?: boolean) {
		if (to !== undefined) expanded.value = to
		else expanded.value = !expanded.value
	}
	return {expanded, toggleMenu}
}
export {useMainMenu}
