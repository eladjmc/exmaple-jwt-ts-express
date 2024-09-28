// src/routes/bookRoutes.ts
import express from 'express';
import * as bookController from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, bookController.getBooks);
router.get('/:id', authMiddleware, bookController.getBook);
router.post('/', authMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

export default router;
