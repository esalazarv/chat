import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// configure mongo connection
mongoose.connect('mongodb://admin:secret@mongo:27017/chat',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//App
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('It works!!');
});

export default app;