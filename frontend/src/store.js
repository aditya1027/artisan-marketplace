import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import orderReducer from './features/orderSlice';
import paymentReducer from './features/paymentSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    payment: paymentReducer,
  },
});
