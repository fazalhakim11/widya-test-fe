import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null, errorr: null },
  reducers: {
    loginSuccess: (state, action) => { state.token = action.payload; },
    logout: (state) => { state.token = null; state.user = null; },
    setUser: (state, action) => { state.user = action.payload; },
    setError: (state, action) => { state.errorr = action.payload; }
  },
});

export const { loginSuccess, logout, setUser, setError } = authSlice.actions;

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try{
    console.log("Start")
    dispatch(setError(null))
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, credentials);
    dispatch(loginSuccess(res.data.token));
    console.log("End")
    navigate("/profile");
  } catch (error) {
    dispatch(setError(error.response?.data?.error))
    console.log(error)
  }
};

export const fetchUserProfile = (token) => async (dispatch) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, { headers: { Authorization: `Bearer ${token}` } });
  dispatch(setUser(res.data));
};

export default authSlice.reducer;
