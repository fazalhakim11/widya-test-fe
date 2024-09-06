import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null },
  reducers: {
    loginSuccess: (state, action) => { state.token = action.payload; },
    logout: (state) => { state.token = null; state.user = null; },
    setUser: (state, action) => { state.user = action.payload; }
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  const res = await axios.post('/api/login', credentials);
  dispatch(loginSuccess(res.data.token));
};

export const fetchUserProfile = (token) => async (dispatch) => {
  const res = await axios.get('/api/profile', { headers: { Authorization: token } });
  dispatch(setUser(res.data));
};

export default authSlice.reducer;
