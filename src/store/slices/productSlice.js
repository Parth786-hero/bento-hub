import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { insertIntoProducts } from "../../../../backend/models/productModel";
import { API_URL } from "../../main";
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const bag = await fetch(`${API_URL}/api/products`, {
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

export const insertIntoProducts = createAsyncThunk(
  "products/insertIntoProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Internal Server Error");
      }

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateIntoProductsById = createAsyncThunk(
  "products/updateIntoProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_URL}/api/products/${payload.id}`,
        {
          // credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Internal Server Error");
      }

      return data; // success response
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
      })

      .addCase(insertIntoProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(insertIntoProducts.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(insertIntoProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateIntoProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateIntoProductsById.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(updateIntoProductsById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
