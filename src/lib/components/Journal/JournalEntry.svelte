<script lang="ts">
	import { Link } from 'carbon-components-svelte';
	import Jounal from './Journal.svelte';
	import type { Journal as _Journal } from './types';

	export let journal: _Journal;
</script>

<div>
    <Link href="/journal/{journal.id}">{journal.name}</Link>
</div>
