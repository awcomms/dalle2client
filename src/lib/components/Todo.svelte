<script lang="ts">
	import { TodoItem } from '$lib/components';
	import type { TodoItem as _TodoItem } from '$lib/types';

	let todo: _TodoItem = {
			open: true,
			done: false,
			recommended: true,
			suggestions: {
				aesthetic: {
					recommended: true,
					suggestions: {
						cyberpunk: {},
						synthwave: {},
						vaporwave: {},
						'dark fantasy': {},
						'dark paradise': {}
					}
				},
				light: {
					recommended: true,
					suggestions: {
						sunset: {},
						'blue hour - cool': {},
						midday: {},
						'overcast lighting flat lighting': {},
						silhouette: {},
						'soft shadow': {},
						'hard shadow': {},
						warm: {},
						cold: {},
						'flash photography': {},
						colorful: {},
						'defined light sourse': {},
						'high-key lighting': {},
						'low-key lighting': {},
						backlit: {},
						studio: {}
					}
				},
				camera: {
					recommended: true,
					suggestions: {
						proximity: {
							recommended: true,
							suggestions: {
								'extreme close-up': {},
								'close-up': {},
								'medium shot': {},
								'long shot': {},
								'extreme long shot': {}
							}
						},
						position: {
							recommended: true,
							suggestions: {
								'high angle': {},
								'low angle': {},
								'aerial view': {},
								'tilted frame': {},
								'over the shoulder shot': {}
							}
						},
						'camera settings + lenses': {},
						'film type': {},
						'in style of named film or TV show': {}
					}
				},
				'photo genres and usage context': {},
				'named photographer, artist or illustrator style': {},
				style: {},
				'art movement': {},
				'3D feel': {},
				'place and space': {},
				craft: {},
				photographing: {}
			}
		},
		all: HTMLElement;
</script>

<div class="all" bind:this={all}>
	<TodoItem text="all suggestions" bind:item={todo} />
</div>
