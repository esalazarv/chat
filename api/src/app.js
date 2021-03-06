import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import api from './routes/api.routes';
import chats from './routes/chat.routes';
import users from './routes/user.routes';

// configure mongo connection
mongoose.connect('mongodb://admin:secret@mongo:27017/chat',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//App
const app = express();
app.use(express.json());
app.use(cors());

// Register routes
app.get('/', api);
app.use('/chats', chats);
app.use('/users', users);

export default app;