import 'reflect-metadata' //importante sempre vir primeiro
import express from 'express';
import createConnection from './database';
import { router } from './routes/routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };