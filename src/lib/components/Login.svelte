<script>
	import { loginOpen } from '$lib/store';
	import {
		TextInput,
		Button,
        Modal,
		Form
	} from 'carbon-components-svelte';

	let 
		username = '',
		password = '',
		usernameInvalid = false,
		passwordInvalid = false;

	function handleSubmit() {
		// handle login logic here
		console.log(username, password);
		// set invalid state if input is wrong
		usernameInvalid =
			username.length < 3;
		passwordInvalid =
			password.length < 6;
	}

	function handleInput() {
		// reset invalid state on input
		usernameInvalid = false;
		passwordInvalid = false;
	}
</script>

<Modal bind:open={$loginOpen}>
	<Form on:submit={handleSubmit}>
		<TextInput
			bind:value={username}
			type="text"
			id="username"
			labelText="Username"
			required
			invalid={usernameInvalid}
			invalidText="Username must be at least 3 characters long."
			on:input={handleInput}
		/>
		<TextInput
			bind:value={password}
			type="password"
			id="password"
			labelText="Password"
			required
			invalid={passwordInvalid}
			invalidText="Password must be at least 6 characters long."
			on:input={handleInput}
		/>
		<Button
			type="submit"
			kind="primary">Login</Button
		>
	</Form>
</Modal>
