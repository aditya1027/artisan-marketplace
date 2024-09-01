import express from 'express';
import {
  createOrder,
  fetchAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { isAdmin, isCustomer, isLoggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, isCustomer, createOrder);
orderRouter.get('/', isLoggedIn, isAdmin, fetchAllOrders);
orderRouter.put('/update/:orderId', isLoggedIn, isAdmin, updateOrderStatus);
orderRouter.get('/:customerId', isLoggedIn, isCustomer, getSingleOrder);

export default orderRouter;
