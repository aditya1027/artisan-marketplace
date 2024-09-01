import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts as fetchProductsAPI,
  fetchProductDetailsAPI,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  fetchArtisanProductsApi,
} from '../services/api';

export const fetchProductsList = createAsyncThunk(
  'products/fetchProducts',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchProductsAPI(page);
      // Only return the data from the response
      return response.data;
    } catch (error) {
      // If you need to handle errors, only include serializable data
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchProductDetailsAPI(page);
      // Only return the data from the response
      return response.data;
    } catch (error) {
      // If you need to handle errors, only include serializable data
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const response = await addProductApi(productData);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, ...productData }) => {
    const response = await updateProductApi(id, productData);
    return response.data;
  }
);

export const fetchArtisanProducts = createAsyncThunk(
  'products/fetchArtisanProducts',
  async (artisanId) => {
    const response = await fetchArtisanProductsApi(artisanId);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await deleteProductApi(id);
    return id;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchArtisanProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtisanProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.artisanProducts = action.payload.products;
      })
      .addCase(fetchArtisanProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload.product;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
