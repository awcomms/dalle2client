<script lang="ts">
	import SideNavLink from './SideNavLink.svelte';
	import { navigating } from '$app/stores';
	import { isSideNavOpen } from '$lib/store';
	import {
		InlineLoading,
		SkipToContent,
		SideNavItems,
		SideNavMenu,
		SideNav,
		Header
	} from 'carbon-components-svelte';
</script>

<Header persistentHamburgerMenu={true} company="Quiz" bind:isSideNavOpen={$isSideNavOpen} href="/">
	{#if $navigating}
		<InlineLoading />
	{/if}
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
</Header>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		<SideNavMenu text="OpenAI">
			<SideNavLink menuItem text="Completions" href="/openai/completions" />
			<SideNavLink menuItem text="DALLE2" href="/openai/dalle2" />
		</SideNavMenu>
		<SideNavMenu text="Images">
			<SideNavLink menuItem text="Scale" href="/images/scale" />
		</SideNavMenu>
	</SideNavItems>
</SideNav>
