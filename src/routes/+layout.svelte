<script>
	import {
		Content,
		Grid,
		Theme
	} from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import { browser } from '$app/environment';
	import {
		Header,
		SideNav
	} from '$lib/components/Nav';
	import Login from '$lib/components/Login.svelte';

	if (
		browser &&
		navigator &&
		navigator.serviceWorker
	)
		navigator.serviceWorker.ready.then(
			(registration) =>
				registration.update()
		);
</script>

<Login />
<Theme theme="g100" />
<Header />
<Content
	style="background: none; padding: 1rem; height: 100%"
>
	<SideNav />
	<Grid>
		<slot />
	</Grid>
</Content>
