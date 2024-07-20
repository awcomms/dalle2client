<script>
	import { Button, TextInput } from 'carbon-components-svelte';

	let user1 = '';
	let user1_done = false;
	let user2 = '';
	let user2_done = false;

	$: user1_done && user2_done && console.log(user1, user2);
</script>

{#if !user1_done}
	<TextInput bind:value={user1} labelText="User 1" />
	<Button on:click={() => (user1_done = true)}>Done</Button>
{/if}

{#if user1_done && !user2_done}
	<TextInput bind:value={user2} labelText="User 2" />
	<Button on:click={() => (user2_done = true)}>Done</Button>
{/if}
