import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../main";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
        
      });
      const data = await res.json();
      
      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }
      localStorage.setItem("token" , data.token);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null,
    success: null,
    user: null,
    showWelcome : false
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
   setUserCartId : (state , action)=>{

    state.user = {...state.user , cartId : action.payload}
   },
   setShowWelcomes : (state , action)=>{
    state.showWelcome = action.payload;
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
       
        state.loading = false;
        state.isAuthenticated = true;
        state.showWelcome = true;
        state.success = "Login successful";
        state.user = action.payload.user || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed";
      });
  },
});

export default loginSlice.reducer;
export const { setAuthenticated , logout , setUserCartId , setShowWelcomes} = loginSlice.actions;
