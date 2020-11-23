import { createServer as HttpServer } from 'http';
import { Server as SocketIO } from "socket.io";
import app from './app';
import SocketBootstrap from "./sockets";
import ChatRepository from "./repositories/chat.repository";
import UserRepository from "./repositories/user.repository";
import MessageRepository from "./repositories/message.repository";

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const SOCKET_IO_OPTIONS = {
    cors: {
        origin: '*'
    },
};
// Create an Http server
const httpServer = HttpServer(app);
export const io = SocketBootstrap(
    new SocketIO(httpServer, SOCKET_IO_OPTIONS),
    new ChatRepository(),
    new UserRepository(),
    new MessageRepository(),
);

// Listen request
export const server = httpServer.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));