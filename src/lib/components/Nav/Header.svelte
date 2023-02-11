<script lang="ts">
	import { navigating } from '$app/stores';
	import { isSideNavOpen } from './store';
	import {
		InlineLoading,
		SkipToContent,
		Header
	} from 'carbon-components-svelte';
</script>

<Header persistentHamburgerMenu={true} company="Stuff" bind:isSideNavOpen={$isSideNavOpen} href="/">
	{#if $navigating}
		<InlineLoading />
	{/if}
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
</Header>
