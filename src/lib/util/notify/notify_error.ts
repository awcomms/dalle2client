import { notify } from '.';

export const notify_error = (title: string) => notify({ kind: 'error', title });
