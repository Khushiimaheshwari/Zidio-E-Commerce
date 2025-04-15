import { createSlice } from "@reduxjs/toolkit";
import apiService from "../connection_services/service.js"; 

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await apiService.login(credentials);
    dispatch(loginSuccess(response)); 
  } catch (error) {
    dispatch(loginFailure(error.message || "Login failed"));
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (token) {
      await apiService.logout(token);
    }
    
    localStorage.removeItem('token');
    
    dispatch(logout());
  } catch (error) {
    console.error("Logout failed:", error);
    dispatch(logout());
  }
};
