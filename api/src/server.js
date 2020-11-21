import { createServer } from 'http';
import app from './app';
import SocketBootstrap from "./sockets";
import ChatService from "./services/chat.service";

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// Create an Http server
const httpServer = createServer(app);
export const io = SocketBootstrap(httpServer, {
    cors: {
        origin: '*'
    },
}, new ChatService());

// Listen request
export const server = httpServer.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));