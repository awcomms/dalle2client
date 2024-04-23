<script lang="ts">
	import { Button, ToastNotification } from 'carbon-components-svelte';
	import type { ToastNotificationProps } from 'carbon-components-svelte/src/Notification/ToastNotification.svelte';
	export let level: number, props: ToastNotificationProps & { button: { text: string; act: () => void } };
</script>

<div class="all" style="z-index: {7777777 + level};">
	<ToastNotification on:close {...props}>
		<div class="button" slot="subtitle">
			{#if props.button}
				<Button {...props.button} size="small" on:click={props.button.act}
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
    .button
        padding-top: layout.$spacing-04
    .all
        position: absolute
        top: layout.$spacing-09
        right: layout.$spacing-02
</style>
