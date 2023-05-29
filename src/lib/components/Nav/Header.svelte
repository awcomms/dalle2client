<script lang="ts">
	import { navigating } from '$app/stores';
	import { PUBLIC_PROJECT_GITHUB_REPOSITORY } from '$env/static/public';
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
		<a href={PUBLIC_PROJECT_GITHUB_REPOSITORY} rel="noopener noreferrer" target="_blank" class="bx--header__action logo">
			<LogoGithub size={20} />
		</a>
	</HeaderUtilities>
</Header>

<style lang="sass">
	.logo
		display: flex
		align-items: center
		justify-content: center
		padding-bottom: 2px
</style>
