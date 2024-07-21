<script lang="ts">
	import { navigating } from '$app/stores';
	import { isSideNavOpen } from './store';
	import { loginOpen } from '$lib/store';
	import { logout } from '$lib/logout';
	import {page} from "$app/stores"
	import {
		InlineLoading,
		SkipToContent,
		Header,
		HeaderUtilities,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelLink,
	} from 'carbon-components-svelte';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
	import { UserAvatarFilledAlt } from 'carbon-icons-svelte';
	import { sign_out } from '$lib/util/user/auth/sign_out';
	import { goto } from '$app/navigation';
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
		<HeaderAction icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
			<HeaderPanelLinks>
				{#if $page.data.user}
					<HeaderPanelLink on:click={() => sign_out()}>sign out</HeaderPanelLink>
				{:else}
					<HeaderPanelLink on:click={() => goto('/auth')}>sign in</HeaderPanelLink>
				{/if}
			</HeaderPanelLinks>
		</HeaderAction>
		<a href={$page.data.github_repo} rel="noopener noreferrer" target="_blank" class="bx--header__action logo">
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
