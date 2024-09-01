import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { isAdmin, isLoggedIn } from '../middlewares/isLoggedIn.js';
import { validateProduct } from '../utils/validators.js';

const productsRoutes = express.Router();

productsRoutes.post('/', validateProduct, createProduct);
productsRoutes.get('/:id', getProduct);
productsRoutes.get('/', getProducts);
productsRoutes.put('/:id', isLoggedIn, updateProduct);
productsRoutes.delete('/:id/delete', isLoggedIn, deleteProduct);

export default productsRoutes;
