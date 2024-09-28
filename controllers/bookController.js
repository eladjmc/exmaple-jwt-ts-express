var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as bookService from '../services/bookService.js';
export const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookService.getAllBooks();
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
export const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield bookService.getBookById(Number(req.params.id));
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
export const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        yield bookService.createBook(book);
        res.status(201).json(book);
    }
    catch (error) {
        next(error);
    }
});
export const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        book.id = Number(req.params.id);
        yield bookService.updateBook(book);
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
export const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookService.deleteBook(Number(req.params.id));
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
