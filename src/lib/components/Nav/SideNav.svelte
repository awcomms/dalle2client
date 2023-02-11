<script>
	import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';

	import { isSideNavOpen } from './store';

	import A2HsLink from './a2hsLink.svelte';
</script>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		<A2HsLink />
		<SideNavMenu text="OpenAI">
			<SideNavLink menuItem text="Completions" href="/openai/completions" />
			<SideNavLink menuItem text="DALLE2" href="/openai/dalle2" />
		</SideNavMenu>
		<SideNavMenu text="Images">
			<SideNavLink menuItem text="Scale" href="/images/scale" />
		</SideNavMenu>
	</SideNavItems>
</SideNav>
