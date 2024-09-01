import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginCustomer as loginCustomerAPI,
  loginArtisan as loginArtisanAPI,
  registerArtisan,
  registerCustomer,
} from '../services/api';
import {
  getCustomerDetails,
  getToken,
  removeCustomerDetails,
  removeToken,
  setCustomerDetails,
  setToken,
} from '../utils/tokenUtils';

export const loginCustomer = createAsyncThunk(
  'auth/loginCustomer',
  async ({ email, password }) => {
    const response = await loginCustomerAPI(email, password);
    setToken(response.data.token);
    setCustomerDetails(response.data.customer);
    return response.data;
  }
);

export const loginArtisan = createAsyncThunk(
  'auth/loginArtisan',
  async ({ email, password }) => {
    const response = await loginArtisanAPI(email, password);
    return response.data;
  }
);

export const customerRegister = createAsyncThunk(
  'customer/register',
  async ({ name, email, password, role }) => {
    const response = await registerCustomer(name, email, password, role);
    return response.data;
  }
);

export const artisanRegister = createAsyncThunk(
  'artisan/register',
  async ({ name, email, password, role }) => {
    const response = await registerArtisan(name, email, password, role);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    customer: getCustomerDetails(),
    artisan: null,
    token: getToken(),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.artisan = null;
      state.customer = null;
      state.token = null;
      removeToken();
      removeCustomerDetails();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginArtisan.fulfilled, (state, action) => {
        state.artisan = action.payload.artisan;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginArtisan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(customerRegister.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(customerRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(artisanRegister.fulfilled, (state, action) => {
        state.artisan = action.payload.artisan;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(artisanRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
