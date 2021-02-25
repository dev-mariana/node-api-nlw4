import 'reflect-metadata' //importante sempre vir primeiro
import express from 'express';
import './database';
import { router } from './routes/routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server is running...'));