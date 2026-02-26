// src/slices/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to call backend API
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
      const data = await res.json();
      
      if (!res.ok) {
        return rejectWithValue(data.message || "Internal server error");
      }
     
      return data;
    } catch (e) {
      console.log(e.message , "Kapooe");
      return rejectWithValue(e.message || "Internal server error");
    }
  }
);

const searchProductsSlice = createSlice({
  name: "searchProductsSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.products;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearResults } = searchProductsSlice.actions;
export default searchProductsSlice.reducer;
