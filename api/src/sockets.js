const SocketBootstrap = (io, chatRepository, userRepository) => {
    // Listen connections
    return io.on('connection', socket => {
        console.log('new connection');

        socket.on('chat.sign-in', async (payload) => {
            userRepository.createIfNotExists(payload).then(user => {
                io.emit('chat.sign-in.success', { message: user });
                console.log('signed in to chat:', user);
            }).catch(error => {
                io.emit('chat.sign-in.error', { message: error });
                console.log('error signing in to chat:', error);
            });
        });

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