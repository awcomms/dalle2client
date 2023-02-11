<script>
	import { Content, Grid, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import { browser } from '$app/environment';
	import { Header, SideNav } from '$lib/components/Nav';

	if (browser && navigator && navigator.serviceWorker)
		navigator.serviceWorker.ready.then((registration) => registration.update());
</script>

<Theme theme="g100" />
<div class="all">
	<Header />
	<div class="content">
		<Content style="background: none; padding: 1rem; height: 100%">
			<SideNav />
			<Grid>
				<slot />
			</Grid>
		</Content>
	</div>
</div>

<style lang="scss">
	.content {
		flex-grow: 1;
		margin-top: 3rem;
	}
	.all {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
