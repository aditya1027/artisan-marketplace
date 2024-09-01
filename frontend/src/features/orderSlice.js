import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  placeOrder as placeOrderApi,
  fetchOrders as fetchOrdersApi,
} from '../services/api';

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const customerId = state.auth.customer._id; // Assuming we store user ID in auth slice
      const { products, totalPrice, shippingAddress } = orderData;

      const response = await placeOrderApi({
        customerId,
        products,
        totalPrice,
        shippingAddress,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomerOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetchOrdersApi(customerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
