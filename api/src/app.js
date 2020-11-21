import express from 'express';
import cors from 'cors';

//App
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('It works!!');
});

export default app;