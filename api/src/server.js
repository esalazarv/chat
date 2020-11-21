import { Server as HttpServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import app from './app';

// Create an Http server
const httpServer = HttpServer(app);
// Create a socket io server
const io = new SocketIO(httpServer, {
    cors: {
        origin: '*'
    },
});

// Listen connections
io.on('connection', socket => {
    console.log('connect');
});

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
// Listen request
httpServer.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));