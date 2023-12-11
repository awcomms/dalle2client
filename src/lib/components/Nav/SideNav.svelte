<script>
	import {
		SideNav,
		SideNavItems,
		SideNavMenu
	} from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';

	import { isSideNavOpen } from './store';

	import A2HsLink from './A2HSLink.svelte';
</script>

<SideNav
	bind:isOpen={$isSideNavOpen}
>
	<SideNavItems>
		<!-- <A2HsLink /> -->
		<!-- <SideNavLink
			text="Call"
			href="/call"
		/> -->
		<SideNavMenu text="AI Chat">
			<SideNavLink
				menuItem
				text="AI Assistant"
				href="/chat/assistant"
			/>
			<SideNavLink
				menuItem
				text="Custom AI Character"
				href="/chat/character"
			/>
			<!-- <SideNavLink menuItem text="Completions" href="/openai/completions" /> -->
		</SideNavMenu>
		<SideNavMenu text="Images">
			<SideNavLink
				menuItem
				text="Create"
				href="/images/create"
			/>
			<SideNavLink
				menuItem
				text="Edit"
				href="/images/edit"
			/>
		</SideNavMenu>

		<SideNavLink
			menuItem
			text="Rescale Images"
			href="/images/scale"
		/>
		<SideNavLink
			menuItem
			text="Settings"
			href="/settings"
		/>
		<!-- <SideNavLink text="Entries" /> -->
	</SideNavItems>
</SideNav>
