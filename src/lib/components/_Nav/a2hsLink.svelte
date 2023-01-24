<script lang="ts">
	export let show = false;
	import SideNavLink from './SideNavLink.svelte';

	let installPrompt: BeforeInstallPromptEvent;

	type UserChoice = Promise<'accepted' | 'dismissed'>;

	interface BeforeInstallPromptEvent extends Event {
		platforms: string[];
		userChoice: UserChoice;
		prompt: () => Promise<{ userChoice: UserChoice; platforms: string[] }>;
	}

	const installed = () => {
		show = false;
	};

	const before = (e: BeforeInstallPromptEvent) => {
		show = true;
		e.preventDefault();
		installPrompt = e;
	};

	const install = () => {
		installPrompt.prompt();
		installPrompt.userChoice.then((choice) => {
			if (choice === 'accepted') {
				show = false;
			}
		});
	};
</script>

<svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} />

{#if show}
	<SideNavLink on:click={install} href={null} text="Add To Homescreen" />
{/if}
