import { Book } from '../models/Book.js';
import jsonfile from 'jsonfile';

const file = './books.json';

export const getBooks = async (): Promise<Book[]> => {
  return jsonfile.readFile(file);
};

export const saveBooks = async (books: Book[]): Promise<void> => {
  await jsonfile.writeFile(file, books, { spaces: 2 });
};
