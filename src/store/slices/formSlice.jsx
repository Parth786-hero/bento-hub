import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const postUser = createAsyncThunk(
  "formSlice/register",
  async (formData, { rejectWithValue }) => {
    try {
      
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    form: {
      fname: "",
      lname: "",
      email: "",
      number: "",
      password: "",
      cpassword: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
    },
    success: null,
    error: null,
    loading: false,
  },
  reducers: {
    updateFormData(state, action) {
      // merge payload into state
      Object.assign(state.form, action.payload);
    },
    resetFormData(state) {
      // optional: reset all fields back to initial values
      Object.keys(state.form).forEach((key) => {
        state.form[key] = "";
      });

      state.success = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(postUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder
    .addCase(postUser.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.success = action.payload;
    });
    builder
    .addCase(postUser.pending, (state) => {
      state.loading = true;
    });
  },
});

export default formSlice.reducer;
export const { updateFormData, resetFormData } = formSlice.actions;
