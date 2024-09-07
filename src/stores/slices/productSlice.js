import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'product',
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => { state.products = action.payload; }
  }
});

export const { setProducts } = productSlice.actions;

export const fetchProducts = (token) => async (dispatch) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } });
  dispatch(setProducts(res.data.products));
};

export default productSlice.reducer;
