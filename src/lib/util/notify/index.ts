import { browser } from '$app/environment';
import { arrayStore } from '$lib/util/store';
import type { ButtonProps } from 'carbon-components-svelte/src/Button/Button.svelte';
import type { ToastNotificationProps } from 'carbon-components-svelte/src/Notification/ToastNotification.svelte';

export type CustomToastNotificationProps =
	ToastNotificationProps & {
		button?: ButtonProps & {
			text?: string;
			act: () => void
		};
		clear_on_input?: boolean;
	};

export const notify = (
	message:
		| string
		| CustomToastNotificationProps
) => {
	if (browser) {
		const n: CustomToastNotificationProps =
			typeof message === 'string'
				? { title: message }
				: message;
		n.caption =
			new Date().toLocaleString();
		if (!n.kind) n.kind = 'success';
		if (
			!n.timeout
			// && n.kind === 'success'
		)
			n.timeout = 3700;
		n.lowContrast = true;
		// TODO? timeout
		notifications.update((ns) => [
			...ns,
			n
		]);
	}
};

export const notifications =
	arrayStore<CustomToastNotificationProps>(
		'notifications',
		[]
	);
