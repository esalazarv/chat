const SocketBootstrap = (io, chatRepository, userRepository) => {
    // Listen connections
    return io.on('connection', socket => {
        console.log('new connection');

        socket.on('chat.sign-in', async (payload) => {
            userRepository.createIfNotExists(payload).then(user => {
                console.log(`try sign in user ${user._id}  `);
                io.emit('chat.sign-in.success', { message: user });
                console.log(`user ${user._id} signed in successfully `);

                // Search chats
                chatRepository.search({ user_id: user._id }).then(chats => chats.forEach(chat => {
                    console.log(`try join user ${user._id} to chat ${chat._id}`);
                    chatRepository.attachUser(chat._id, user._id);
                    socket.join(chat._id); // join to each chat using the id for the name
                    console.log(`user ${user._id} joined to chat ${chat._id}`);
                }));

            }).catch(error => {
                io.emit('chat.sign-in.error', { message: error });
                console.log('error signing user in to chat:', error);
            });
        });

        socket.on('chat.sign-out', async (payload) => {

            // Search default chats
            chatRepository.search()
                .then(chats => chats.forEach(chat => {
                    socket.leave(chat._id); // leave to each chat using the id for the name
                    console.log('user leave chat', chat._id);
                }))
                .catch(error => {
                    console.log('error signing out to chat:', error);
                    io.emit('chat.sign-out.error', { message: error });
                });

            io.emit('chat.sign-out.success', { message: payload });
            console.log('signed out to chat:', payload);
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