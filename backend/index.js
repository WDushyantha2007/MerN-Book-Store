import express from "express";
import {PORT, CONNECTION_URL} from "./config.js";
import mongoose from "mongoose";
import bookRoute from './router/bookRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use('/books', bookRoute);
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5173'],
    methods: ['GET'],
    allowedHeaders: ['Access-Control -Allow-Origin'],
})); 

app.get('/', (request, response) => {
    console.log(request);
    response.status(200).send('Welcome to the tutorial');
});

mongoose.connect(CONNECTION_URL)
.then(() => {
    console.log('database connection sucessfull');
    app.listen(PORT, () => {
    console.log(`App listening port : ${PORT}`);
});
}).
catch((error) => {
    console.log(error);
});