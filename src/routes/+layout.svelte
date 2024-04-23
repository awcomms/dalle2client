<script>
	import { Content, Grid, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import { browser } from '$app/environment';
	import { Header, SideNav } from '$lib/components/Nav';
	// import Login from '$lib/components/Login.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Notifications from '$lib/components/Notification/Notifications.svelte';

	inject({
		mode: dev ? 'development' : 'production'
	});

	// if (
	// 	browser &&
	// 	navigator &&
	// 	navigator.serviceWorker
	// )
	// 	navigator.serviceWorker.ready.then(
	// 		(registration) =>
	// 			registration.update()
	// 	);
</script>

<!-- <Login /> -->
<Notifications />

<Theme theme="g100" />
<Header />
<Content style="background: none; padding: 1rem; height: 100%">
	<SideNav />
	<Grid>
		<slot />
	</Grid>
</Content>
