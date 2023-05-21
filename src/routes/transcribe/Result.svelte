<script lang="ts">
	import { download_blob } from "$lib/util";
	import { Button, CopyButton } from "carbon-components-svelte";
	import type { Result } from "./types";

	export let entry: Result;
</script>

<div>
	{entry.name}
	{#if entry.text}
		<CopyButton text={entry.text} />
		<p>{entry.text}</p>
	{/if}
	{#if entry.blob}
		<Button
			on:click={() =>
				download_blob(
					entry.blob,
					entry.name
				)}
		>
			Download
		</Button>
	{/if}
</div>
