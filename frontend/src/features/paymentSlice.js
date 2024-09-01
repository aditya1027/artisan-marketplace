import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { processPayment } from '../services/api';

export const submitPayment = createAsyncThunk(
  'payment/submitPayment',
  async (paymentData) => {
    const response = await processPayment(paymentData);
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentInfo: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearPaymentInfo: (state) => {
      state.paymentInfo = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentInfo = action.payload;
      })
      .addCase(submitPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearPaymentInfo } = paymentSlice.actions;

export default paymentSlice.reducer;
