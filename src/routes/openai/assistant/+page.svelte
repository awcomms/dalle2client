<script lang="ts">
	import { Assistant } from '$lib/components/ai_chat';
</script>

<Assistant
	parameters={{
		model: 'llama3-70b-8192',
		messages: [{ role: 'system', content: '' }]
	}}
/>
