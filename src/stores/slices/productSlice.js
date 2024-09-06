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
  const res = await axios.get('/api/products', { headers: { Authorization: token } });
  dispatch(setProducts(res.data));
};

export default productSlice.reducer;
