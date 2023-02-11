<script>
	import { bank_codes } from '$lib/util/wait';
	import { Button } from 'carbon-components-svelte';

	const get_bank_codes = async () => {
		await bank_codes()
			.then((r) => console.log(r))
			.catch((e) => console.log('error: ', e));
	};
</script>

<Button on:click={get_bank_codes}>console.log bank codes</Button>
