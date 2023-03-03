export const post = (path: string, body: object, headers: object = {}) =>
	fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(body)
	}).then(async (r) => {
		const text = await r.text();
		if (r.statusText === 'OK') {
			let res;
			try {
				res = JSON.parse(text);
			} catch {
				res = text;
			}
			return res;
		} else {
			throw new Error(`${r.status}: ${text}`);
		}
	});
