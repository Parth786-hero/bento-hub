import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../main";
// Async thunk to fetch subcategories
export const fetchSubCategoryByCatId = createAsyncThunk(
  "category/fetchSubCategoryByCatId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/getAllSubCatById/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
     
      if (!res.ok) {
        return rejectWithValue(data.message || "Category failed to fetch");
      }
      
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    data: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategoryByCatId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoryByCatId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.categories;
      })
      .addCase(fetchSubCategoryByCatId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subcategorySlice.reducer;
