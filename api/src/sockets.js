import { Server as SocketIO } from "socket.io";

const SocketBootstrap = (httpServer, config, chatService) => {
    // Create a socket io server
    const io = new SocketIO(httpServer, config);
    // Listen connections
    return io.on('connection', socket => {
        console.log('new connection');
        chatService.createIfNotExists({ name: 'room:general', alias: 'General', public: true })
            .then(chat => console.log(`${chat.name} created`))
            .catch(error => console.log('could not create a chat:', error));

        socket.on('join', ({ room }) => {
            socket.join(room);
            console.log('joined to room', room);
            io.to(room).emit('message', { room, message: 'welcome'});
        });

        socket.on('typing:start', ({ room }) => {
            console.log('start typing');
            io.to(room).emit('typing:start', { room });
        });

        socket.on('typing:stop', ({ room }) => {
            console.log('stop typing');
            io.to(room).emit('typing:stop', { room });
        });

        socket.on('send', ({ room, message }) => {
            console.log('sending message');
            io.to(room).emit('message', { room, message});
        });
    });
}

export default SocketBootstrap;