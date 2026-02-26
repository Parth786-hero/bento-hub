import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const categoryWiseProduct = createAsyncThunk(
  "products/productByCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/products/category/" + id);
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || res.statusText);
      }

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const productByCategorySlice = createSlice({
  name: "productByCategorySlice",
  initialState: {
    loading: false,
    error: null,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryWiseProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryWiseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(categoryWiseProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
      });
  },
});

export default productByCategorySlice.reducer;
