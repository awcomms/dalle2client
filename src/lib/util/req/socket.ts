import { v4 as uuidv4 } from 'uuid';
import { get } from 'svelte/store';
import { token } from '$lib/store';
import { BACKEND_SOCKET } from '$lib/env';
import iso_ws from 'isomorphic-ws';

const reqs = new Map();

interface Res {
	id: string;
	data: string;
}

const socket = new iso_ws(BACKEND_SOCKET);

// TODO error notification if response error

const getWS: () => Promise<WebSocket> = () => {
	return new Promise((resolve) => {
		if (socket.readyState === 1) {
			resolve(socket);
			return;
		}
		setInterval(() => {
			if (socket.readyState === 1) {
				resolve(socket);
				return;
			}
		}, 1000);
	});
};

socket.onerror = Function();

socket.onmessage = ({ data }: { data: string }) => {
	console.log('res', data);
	let res: Res = { id: '', data: '' };
	try {
		res = JSON.parse(data);
	} catch {
		console.error(`non-JSON response: ${data}`);
	}

	const [resolve, reject] = reqs.get(res.id);
	if (!resolve) {
		console.error(`response with unmatched id: ${res}`);
	} else {
		let json_res = {};
		try {
			json_res = JSON.parse(res.data);
		} catch {
			console.error(`non-JSON response data: ${res.data}`);
			resolve(res.data);
		}
		Object.hasOwn(json_res, 'error') ? reject(json_res) : resolve(json_res);
	}
};

type Model = 'User' | 'Attempt' | 'Quiz';

const cached = (model: Model, id: number) => {
	let cache = localStorage.get('req');
	if (!cache) return
	cache = JSON.parse(cache);
	if (!cache[model]) return
	return cache[model][id];
};

export const req = async<Type>(data: object, auth = false): Promise<Type> => {
	console.log('req', data, auth);
	const id = uuidv4();
	const model_object = data[Object.keys(data)[0]];
	if (auth) {
		model_object[Object.keys(model_object)[0]].token = get(token);
	}
	const req_data = { id, model : JSON.stringify(data) };
	// console.log(req_data)
	return new Promise((resolve, reject) => {
		reqs.set(id, [resolve, reject]);
		getWS()
			.then((socket) => socket.send(JSON.stringify(req_data)))
			// .catch(() => {
			// 	const action = Object.keys(model_object)[0];
			// 	if (action === 'GET') {
			// 		const get_id = model_object[action][id];
			// 		const model = Object.keys(model_object)[0];
			// 		const res = cached(model, get_id);
			// 		res ? resolve(res) : reject();
			// 	} else {
			// 		reject();
			// 	}
			// });
	});
};
