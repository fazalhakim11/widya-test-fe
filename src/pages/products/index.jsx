import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../stores/slices/productSlice";
import Navbar from "../../components/navbar";
import CreateProduct from "../../components/createProduct"

const ProductList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token));
    }
  }, [token, dispatch, products]);

  const [show, setShow] = useState(false)
  const handleAddProduct =()=>{
    setShow(!show)
  }

  return (
    <>
      <Navbar />
      <div className="text-white mx-5">
        <h1 className="text-xl font-bold text-center mb-2">Products</h1>
        <button onClick={handleAddProduct}>Add Product</button>
        
        {show &&<CreateProduct/> }
        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          products.products.map((product) => (
            <div key={product._id} className="border border-white p-2">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p>
                {product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
