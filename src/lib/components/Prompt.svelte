<script lang="ts">
	export let value = '';

	import { Link, TextInput } from 'carbon-components-svelte';
	import { Todo } from '$lib/components';
</script>

<Link
	href="https://dallery.gallery/wp-content/uploads/2022/07/The-DALL%C2%B7E-2-prompt-book-v1.02.pdf"
	>Guide book</Link
>
<div class="todo">
	<Todo />
</div>
<TextInput bind:value />

<style lang="sass">
    .todo
        overflow: scroll
        max-height: 370px
</style>
