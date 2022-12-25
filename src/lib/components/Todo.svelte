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
						'camera settings + lenses': {
							suggestions: {
								'fast shutter speed': {},
								'slow shutter speed': {},
								bokeh: {},
								'tilt shit photography': {},
								'motion blur': {},
								'telephoto lens': {},
								'macro lens': {},
								'wide angle lens': {},
								'fish-eye lens': {},
								'deep depth of field': {},
								'direction - above, below, side': {}
							}
						},
						'film type': {
							suggestions: {
								kodachrome: {},
								autochrome: {},
								lomography: {},
								polaroid: {},
								cameraphone: {},
								cctv: {},
								'disposable camera': {},
								daguerrotype: {},
								'camera obscura': {},
								'double exposure': {},
								cyanotype: {},
								monochrome: {},
								'redscale photography': {},
								'infrared photography': {},
								'bleach bypass': {},
								'faux-retro': {},
								'contact sheet': {},
								'color splash': {},
								solarised: {},
								anaglyph: {}
							}
						},
						'in style of named film or TV show': {}
					}
				},
				'photo genres and usage context': {
					suggestions: {
						'event photography': {},
						'film premier': {},
						'action sports': {},
						'editorial fashion photography': {},
						'from vogue magazine': {}
					}
				},
				'named photographer, artist or illustrator style': {},
				style: {
					suggestions: {
						monochrome: {
							suggestions: {
								stencil: {},
								'street art': {},
								banksy: {},
								'Ballpoint pen art': {},
								'Pencil sketch': {},
								'Pencil drawing, detailed, hyper-detailed, very realistic ': {},
								'Political cartoon from U.S. newspaper': {},
								'Charcoal sketch': {},
								Woodcut: {},
								'Field journal line art': {},
								'Colouring-in sheet': {},
								Etching: {}
							}
						},
						illustration: {
							suggestions: {
								' allegra': {},
								'vector art': {}
							}
						},
						instructional: {
							suggestions: {
								blueprint: {},
								'ikea manual': {}
							}
						},
						'isometric 3D': {},
						'3D render, octane 3D, cinema 4D': {},
						'perler beads': {},
						'in the style of named tv shows': {},
						'in the style of particular illustrators or artist': {}
					}
				},
				'art movement': {
					suggestions: {
						'constructivist, russian design': {},
						'renaissance painting': {},
						'roman mosaic': {},
						suprematism: {},
						abstract: {},
						geometric: {},
						metaphysical: {},
						'street photography': {},
						candid: {},
						unposed: {},
						urbar: {},
						'art deco': {},
						'streamline moderne': {},
						luxury: {}
					}
				},
				'3D feel': {
					suggestions: {
						'Bronse statue': {},
						'Butter sculpture': {},
						'sand sculpture': {},
						'ice carving': {}
					}
				},
				'place and space': {
					suggestions: {
						architecture: {},
						buildings: {},
						'domestic interiors': {},
						'commercial interiors': {},
						'public realm, streets, squares, plazas, cityscapes': {}
					}
				},
				craft: {
					suggestions: {
						'paper and textiles': {
							suggestions: {
								'papercraft, origami': {},
								'pop-up book': {},
								'paper embossing': {}
							}
						},
						'ceramics and glass': {
							suggestions: {
								snowglobe: {},
								'glass paperweight': {},
								'ceramic, bust, kintsugi': {},
								'clay, potter, sculpture': {},
								bubblegram: {},
								'crystal figure': {}
							}
						}
					}
				}
			}
		},
		all: HTMLElement;
</script>

<div class="all" bind:this={all}>
	<TodoItem text="all suggestions" bind:item={todo} />
</div>
