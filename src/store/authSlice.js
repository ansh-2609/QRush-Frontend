import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({ 
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: null,
    authLoaded: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
    setAuthStatus: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
      state.authLoaded = true;
    },
  },
});

export const { login,setUserId, logout, setAuthStatus } = authSlice.actions;
export default authSlice;
