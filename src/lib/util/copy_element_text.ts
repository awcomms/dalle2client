import type { Action } from 'svelte/action';

export const copy_element_text: Action<HTMLElement> = (node: HTMLElement) => {
	node.addEventListener('click', async () => {
		await navigator.clipboard.writeText(node.innerText);
	});
};
