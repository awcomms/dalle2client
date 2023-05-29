<script lang="ts">
	import { navigating } from '$app/stores';
	import { isSideNavOpen } from './store';
	// import { loginOpen } from '$lib/store';
	// import { logout } from '$lib/logout';
	import {
		InlineLoading,
		SkipToContent,
		Header,
		HeaderUtilities,
		// HeaderAction,
		// HeaderPanelLinks,
		// HeaderPanelLink,

		HeaderGlobalAction,

		Link


	} from 'carbon-components-svelte';
	// import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
</script>

<Header
	persistentHamburgerMenu={true}
	company="Stuff"
	bind:isSideNavOpen={$isSideNavOpen}
	href="/"
>
	{#if $navigating}
		<InlineLoading />
	{/if}
	<svelte:fragment
		slot="skip-to-content"
	>
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<!-- <HeaderAction
			icon={UserAvatarFilledAlt}
			closeIcon={UserAvatarFilledAlt}
		>
			<HeaderPanelLinks>
				<HeaderPanelLink
					on:click={() => {
						$loginOpen = true;
					}}>Login</HeaderPanelLink
				>
				<HeaderPanelLink
					on:click={logout}
					>Logout</HeaderPanelLink
				>
			</HeaderPanelLinks>
		</HeaderAction> -->
		<HeaderGlobalAction aria-label="Github repository" icon={LogoGithub}>
			<Link href="https://github.com/awcomms/stuff" />
		</HeaderGlobalAction>
	</HeaderUtilities>
</Header>
