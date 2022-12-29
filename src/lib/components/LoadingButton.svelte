<script lang="ts">
  export let disable = true, loading = false,
		size = 'small';
	import { Button, InlineLoading } from 'carbon-components-svelte';
</script>

<Button disabled={disable && loading} as let:props>
	<div on:click {size} {...props}>
		<slot />
		{#if loading}
			<div class="right">
				<InlineLoading />
			</div>
		{/if}
	</div>
</Button>
