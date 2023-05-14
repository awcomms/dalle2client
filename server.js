import express from 'express';
import { createServer } from 'http';
import { handler } from './build/handler.js';
import { ExpressPeerServer } from 'peer';

const app = express();
app.use(handler);

const server = createServer(app);
const peerServer =
	ExpressPeerServer(server);

app.use('/peerjs', peerServer);

server.listen(
	process.env.PORT || 3000
);
