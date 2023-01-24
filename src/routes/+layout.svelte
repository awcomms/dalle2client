<script>
	import { Content, Grid, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import Header from '$lib/components/_Nav/Header.svelte';
	import { browser } from '$app/environment';

	if (browser && navigator && navigator.serviceWorker)
		navigator.serviceWorker.ready.then((registration) => registration.update());
</script>

<Theme persist theme="g100" />
<Header />
<Content style="background: none; padding: 1rem">
	<Grid>
		<slot />
	</Grid>
</Content>
