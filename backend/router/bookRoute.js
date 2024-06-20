import express from "express";
import { Book } from '../models/BookModel.js';

const bookRoute = express.Router();

bookRoute.post('/', async (request, response) => {
    try {

        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {

            return response.status(400).send(
                { message: 'Send fields' }
            );
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook);
        return response.status(201).set('Access-Control-Allow-Origin', '*').send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoute.get('/', async (request, response) => {
    try {

        const books = await Book.find();
        response.status(200).set('Access-Control-Allow-Origin', '*').send(books);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoute.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);
        response.status(200).set('Access-Control-Allow-Origin', '*').send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoute.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findByIdAndDelete(id);
        response.status(200).set('Access-Control-Allow-Origin', '*').send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoute.put('/:id', async (request, response) => {
    try {

        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {

            return response.status(400).send(
                { message: 'Send fields' }
            );
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        response.status(200).set('Access-Control-Allow-Origin', '*').send(result);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default bookRoute; 