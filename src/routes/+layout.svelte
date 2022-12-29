<script>
	export const prerender = true;
	
	import { Content, Grid } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/g100.css';
	import 'carbon-components-svelte/css/white.css';
	import Header from '$lib/components/_Nav/Header.svelte';
	import Theme from '$lib/components/Theme.svelte';
	import { browser } from '$app/environment';

	if (browser && navigator && navigator.serviceWorker) navigator.serviceWorker.ready.then((registration) => registration.update())
</script>

<Theme persist theme="white">
	<Header />
	<Content style="background: none; padding: 1rem">
		<Grid>
			<slot />
		</Grid>
	</Content>
</Theme>
