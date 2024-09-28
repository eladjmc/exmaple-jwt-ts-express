import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService.js';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await bookService.getBookById(Number(req.params.id));
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book: any = req.body;
    await bookService.createBook(book);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book: any = req.body;
    book.id = Number(req.params.id);
    await bookService.updateBook(book);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookService.deleteBook(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
