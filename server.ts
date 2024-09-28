import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
