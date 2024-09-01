import express from 'express';
import {
  getCustomerProfileController,
  loginCustomerController,
  registerCustomerController,
} from '../controllers/customerController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const customerRoutes = express.Router();

customerRoutes.post('/register', registerCustomerController);
customerRoutes.post('/login', loginCustomerController);
customerRoutes.get('/profile', isLoggedIn, getCustomerProfileController);

export default customerRoutes;
