import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../main";
export const fetchProductsOnScroll = createAsyncThunk(
    "productsOnScroll/fetch",
    async ({ limit, lastId }, { rejectWithValue }) => {
      try {
        // Build query string safely
      
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit);
        if (lastId) params.append("lastId", lastId);
        const url = `${API_URL}/api/productsOnScroll?${params.toString()}`;
       
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          return rejectWithValue(data.message || "Server Error");
        }
    
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  

const productsOnScrollSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    lastId: null,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsOnScroll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsOnScroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsOnScroll.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.products];
        state.lastId = action.payload.lastId;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      });
  },
});

export default productsOnScrollSlice.reducer;
