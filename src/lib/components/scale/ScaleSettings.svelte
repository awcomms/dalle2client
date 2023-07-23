<script lang="ts">
	import { Toggle } from 'carbon-components-svelte';
	import { include_date, include_factor, utc_date } from './store';
</script>

<Toggle
	labelText="Include rescale factor in result's file name"
	bind:toggled={$include_factor}
/>
<Toggle
	labelText="Include date in result's file name"
	bind:toggled={$include_date}
/>

