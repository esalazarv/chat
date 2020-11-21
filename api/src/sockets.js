const SocketBootstrap = (io, chatRepository) => {
    // Listen connections
    return io.on('connection', socket => {
        console.log('new connection');

        socket.on('chat.join', ({ room, options }) => {
            // join to chat
            socket.join(room);
            console.log('joined to chat:', room);
            io.to(room).emit('chat.join.success', { room, message: 'welcome'});
        });

        socket.on('chat.typing.start', ({ room }) => {
            console.log('start typing in chat:', room);
            io.to(room).emit('chat.typing.start', { room });
        });

        socket.on('chat.typing.stop', ({ room }) => {
            console.log('stop typing in chat:', room);
            io.to(room).emit('chat.typing.stop', { room });
        });

        socket.on('chat.message', ({ room, message }) => {
            console.log('sending message in chat:', room);
            io.to(room).emit('chat.message', { room, message});
        });
    });
}

export default SocketBootstrap;