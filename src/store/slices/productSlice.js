import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const bag = await fetch("http://localhost:5000/api/products", {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await bag.json();

      if (!bag.ok) {
        return rejectWithValue(data.message || "Internal Server Error");
      }

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
      });
  },
});

export default productSlice.reducer;
