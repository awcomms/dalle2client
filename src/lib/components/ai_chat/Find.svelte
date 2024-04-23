<script lang="ts">
	import Assistant from './Assistant.svelte';

	const m = `Hi, I can help you find like minded people on WhatsApp. To do this, I'd like to know more about you, your interests, your hobbies, your world view and beliefs, what kind of things you find funny, and any other thing you think could help to find users that you'd resonate with, users similar to you, that share the same worldviews and passions as you`;

	let parameters = {
		model: 'llama3-70b-8192',
		messages: [
			{
				role: 'system',
				content: `You help users find like minded WhatsApp users. You first ask for their WhatsApp link, and then try to understand them more, what kind of person they are, their worldviews, their beliefs, their hobbies, their interests, their sense of humor, anything that would help to find similar people to them. Then, when you feel like you have gotten enough information about the user, you run the save function, to save a description of them to the database, by responding with a single word: "save"`
			}
		]
	};

	const stop = async (e: CustomEvent) => {
		const content = e.detail;
		if (content === 'save') {
			// save_user()
			// const res = await search()
			// parameters.messages = [...parameters.messages, {
			//     role: 'assistant',
			//     content: res.documents.map(r => `[${r.value.username}](${r.value.whatsapp}) - ${r.value.score}`).join('\n\n')
			// }]
		}
	};
</script>

<Assistant bind:parameters on:stop={stop} />
