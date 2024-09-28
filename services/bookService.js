var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooks, saveBooks } from '../dal/bookDAL.js';
export const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return getBooks();
});
export const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBooks();
    return books.find(book => book.id === id);
});
export const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBooks();
    books.push(book);
    yield saveBooks(books);
});
export const updateBook = (updatedBook) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield getBooks();
    books = books.map(book => (book.id === updatedBook.id ? updatedBook : book));
    yield saveBooks(books);
});
export const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield getBooks();
    books = books.filter(book => book.id !== id);
    yield saveBooks(books);
});
