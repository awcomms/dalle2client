<script lang="ts">
	import TodoItem from './TodoItem.svelte';
	import type { TodoItem as _TodoItem } from '$lib/types';

	export let words: string

	let wordlist: string[] = []

	$: words = wordlist.join(', ')

	let todo: _TodoItem = {
			open: true,
			done: false,
			recommended: true,
			suggestions: {
				emotion: {
					recommended: true,
					suggestions: {
						'positive mood, low energy': {
							suggestions: {
								light: {},
								peaceful: {},
								calm: {},
								serene: {},
								soothing: {},
								relaxed: {},
								placid: {},
								comforting: {},
								cosy: {},
								tranquil: {},
								quiet: {},
								pastel: {},
								delicate: {},
								graceful: {},
								subtle: {},
								balmy: {},
								mild: {},
								ethereal: {},
								elegant: {},
								tender: {},
								soft: {}
							}
						},
						'negative mood, low energy': {
							suggestions: {
								muted: {},
								bleak: {},
								funereal: {},
								somber: {},
								melancholic: {},
								mournful: {},
								gloomy: {},
								dismal: {},
								sad: {},
								pale: {},
								'washed-out': {},
								desaturated: {},
								grey: {},
								subdued: {},
								dull: {},
								dreary: {},
								depressing: {},
								weary: {},
								tired: {}
							}
						},
						'positive mood, high energy': {
							suggestions: {
								bright: {},
								vibrant: {},
								dynamic: {},
								spirited: {},
								vivid: {},
								lively: {},
								energetic: {},
								colorful: {},
								joyful: {},
								romantic: {},
								expressive: {},
								rich: {},
								kaleidoscopic: {},
								psychedelic: {},
								saturated: {},
								ecstatic: {},
								brash: {},
								exciting: {},
								passionate: {},
								hot: {}
							}
						},
						'negative mood, high energy': {
							suggestions: {
								dark: {},
								ominous: {},
								threatening: {},
								haunting: {},
								forbidding: {},
								gloomy: {},
								stormy: {},
								doom: {},
								apocalyptic: {},
								sinister: {},
								shadowy: {},
								ghostly: {},
								unnerving: {},
								harrowing: {},
								dreadful: {},
								frightful: {},
								shocking: {},
								terror: {},
								hideous: {},
								ghastly: {},
								terrifying: {}
							}
						}
					}
				},
				'size-y, structure-y': {
					recommended: true,
					suggestions: {
						'big and free': {
							suggestions: {
								curvaceous: {},
								swirling: {},
								organic: {},
								riotous: {},
								turbulent: {},
								flowing: {},
								amorphous: {},
								natural: {},
								distorted: {},
								uneven: {},
								random: {},
								lush: {},
								bold: {},
								intuitive: {},
								emotive: {},
								chaotic: {},
								tumultuous: {},
								earthy: {},
								churning: {}
							}
						},
						'big and structured': {
							suggestions: {
								monumental: {},
								imposing: {},
								rigorous: {},
								geometric: {},
								ordered: {},
								angular: {},
								artificial: {},
								lines: {},
								straight: {},
								rhythmic: {},
								composed: {},
								unified: {},
								manmade: {},
								perspective: {},
								minimalist: {},
								blocks: {},
								dignified: {},
								robust: {},
								defined: {}
							}
						},
						'small and structured': {
							suggestions: {
								ornate: {},
								delicate: {},
								neat: {},
								precise: {},
								detailed: {},
								opulent: {},
								lavish: {},
								elegant: {},
								ornamented: {},
								fine: {},
								elaborate: {},
								accurate: {},
								intricate: {},
								meticulous: {},
								decorative: {},
								realistic: {}
							}
						},
						'small and free': {
							suggestions: {
								unplanned: {},
								daring: {},
								brash: {},
								random: {},
								casual: {},
								sketched: {},
								playful: {},
								spontaneous: {},
								extemporaneous: {},
								offhand: {},
								improvisational: {},
								experimental: {},
								loose: {},
								jaunty: {},
								light: {},
								expressive: {}
							}
						}
					}
				},
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
								'medium shot': {
									suggestions: {
										'mid-shot': {},
										'waist shot': {}
									}
								},
								'long shot': {
									suggestions: {
										'wide shot': {},
										'full shot': {}
									}
								},
								'extreme long shot': {
									suggestions: {
										'extreme wide shot, <X> in the distance': {}
									}
								}
							}
						},
						position: {
							recommended: true,
							suggestions: {
								'overhead view': {
									suggestions: {
										'establishing shot': {},
										'from above': {},
										'high angle': {},
										'crane shot': {}
									},
									examples: [
										'Film still, establishing shot of bustling farmers market, golden hour, high angle'
									]
								},
								'low angle': {
									suggestions: {
										'from below': {},
									},
									examples: [
										'Film still, gangster squirrel counting his money, low angle,shot from below, worms eye view'
									]
								},
								'aerial view': {
									suggestions: {
										"bird's eye view, drone photography": {},
									},
									examples: [
										"Aerial photo of a coral reef that looks like a labyrinth"
									]
								},
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
	<TodoItem on:done_changed={({detail}) => { console.debug(detail); if (wordlist.includes(detail)) {
		wordlist = wordlist.filter(w => w !== detail)
	} else {
		wordlist = [...wordlist, detail]
	}}} text="all suggestions" bind:item={todo} />
</div>