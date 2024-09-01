import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import {
  globalErrorHandler,
  notFound,
} from '../middlewares/globalErrorHandler.js';

import productsRoutes from '../routes/productsRoutes.js';
import orderRouter from '../routes/orderRouter.js';
import customerRoutes from '../routes/customerRoutes.js';
import artisanRoutes from '../routes/artisanRoutes.js';

//Database connection
dbConnect();
const app = express();

//pass incoming data
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//routes
app.use('/api/v1/artisan/', artisanRoutes);
app.use('/api/v1/customer/', customerRoutes);
app.use('/api/v1/products/', productsRoutes);
app.use('/api/v1/orders/', orderRouter);

//err middlewares
app.use(notFound);
app.use(globalErrorHandler);

export default app;
