import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../main";
// Async thunk to trigger discount via backend API
export const triggerDiscount = createAsyncThunk(
  "discountScheduler/triggerDiscount",
  async ({ percentage = 50, durationMinutes = 1}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/trigger-discount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ percentage, durationMinutes }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to trigger discount");
      }

      localStorage.setItem("discount", JSON.stringify({
        startedAt: Date.now(),
        durationMinutes,
        percentage
      }));
      return { percentage, durationMinutes, message: data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const discountSchedulerSlice = createSlice({
  name: "discountScheduler",
  initialState: {
    show: false,
    percentage: 0,
    durationMinutes: 0,
    loader: false, 
    error: null,
  },
  reducers: {
    endDiscount: (state) => {
      state.show = false;
      state.percentage = 0;
      state.durationMinutes = 0;
      state.error = null;
    },
    switchOn: (state) => {
      state.show = true;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(triggerDiscount.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(triggerDiscount.fulfilled, (state, action) => {
        state.loader = false;
        state.show = true;
        state.percentage = action.payload.percentage;
        state.durationMinutes = action.payload.durationMinutes;
      })
      .addCase(triggerDiscount.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});

export const { endDiscount, switchOn } = discountSchedulerSlice.actions;
export default discountSchedulerSlice.reducer;
