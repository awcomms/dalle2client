<script lang="ts">
	import type { CustomToastNotificationProps } from '$lib/util/notify';
	import {
		Button,
		ToastNotification
	} from 'carbon-components-svelte';
	// import type { ToastNotificationProps } from "carbon-components-svelte/types/Notification/ToastNotification.svelte";
	export let level: number,
		props: CustomToastNotificationProps;
</script>

<div
	class="all"
	style="z-index: {7777777 + level};"
>
	<ToastNotification
		on:close
		{...props}
	>
		<div slot='subtitle'>
			{#if props.button}
				<Button
					{...props.button}
					size="small"
					on:click={props.button.act}
					>{#if props.button.text}
						{props.button.text}
					{/if}</Button
				>
			{/if}
		</div>
	</ToastNotification>
</div>

<style lang="sass">
    @use '@carbon/layout'
    .all
        position: absolute
        top: layout.$spacing-09
        right: layout.$spacing-02
</style>
