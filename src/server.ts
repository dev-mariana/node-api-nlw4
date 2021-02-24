import 'reflect-metadata' //importante sempre vir primeiro
import express from 'express';
import './database';

const app = express();

app.get('/', (req, res) => {
    return res.json({ message: 'Hello World - NLW4'});
});

app.post('/', (req, res) => {
    return res.json({ message: 'Success!'});
});

app.listen(5000, () => console.log('Server is running...'));