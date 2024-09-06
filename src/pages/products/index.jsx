import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from "../../components/navbar"
import { fetchProducts } from '../../stores/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token));
    }
  }, [token, dispatch]);
  return (
    <div>
      <Navbar/>
      <h1>Products</h1>
      {products.length === 0 ? <p>No product found</p>:
      products.products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))
      }
    </div>
  );
};

export default ProductList;
