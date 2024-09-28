import { Book } from '../models/Book';
import { getBooks, saveBooks } from '../dal/bookDAL.js';

export const getAllBooks = async (): Promise<Book[]> => {
  return getBooks();
};

export const getBookById = async (id: number): Promise<Book | undefined> => {
  const books = await getBooks();
  return books.find(book => book.id === id);
};

export const createBook = async (book: Book): Promise<void> => {
  const books = await getBooks();
  books.push(book);
  await saveBooks(books);
};

export const updateBook = async (updatedBook: Book): Promise<void> => {
  let books = await getBooks();
  books = books.map(book => (book.id === updatedBook.id ? updatedBook : book));
  await saveBooks(books);
};

export const deleteBook = async (id: number): Promise<void> => {
  let books = await getBooks();
  books = books.filter(book => book.id !== id);
  await saveBooks(books);
};
