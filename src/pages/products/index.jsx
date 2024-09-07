import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { fetchProducts } from "../../stores/slices/productSlice";
import Navbar from "../../components/navbar";
import CreateProduct from "../../components/createProduct";
import EditProduct from "../../components/editProduct";

const ProductList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token));
    }
  }, [token, dispatch]);

  const [show, setShow] = useState(false);
  const handleAddProduct = () => {
    setShow(!show);
  };

  const handleDelete = async (id, name) => {
    try {
      if (!confirm(`Are you sure you want to delete ${name}?`)) return;
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      dispatch(fetchProducts(token));
    } catch (error) {
      console.log(error);
    }
  };
  const [isEditing, setIsEditing] = useState(null);
  const handleEdit = (id) => {
    setIsEditing(id);
  };

  return (
    <>
      <Navbar />
      <div className="text-white mx-5">
        <h1 className="text-xl font-bold text-center mb-2">Products</h1>
        <button onClick={handleAddProduct}>
          {show ? "Cancel" : "Add Product"}
        </button>

        {show && <CreateProduct setShow={setShow} show={show} />}
        {products.length === 0 ? (
          !show && <p>No product found</p>
        ) : (
          products.map((product) =>
            isEditing === product._id ? (
              <EditProduct
                key={product._id}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                id={product._id}
                pname={product.name}
                desc={product.description}
                pprice={product.price}
              />
            ) : (
              <div
                key={product._id}
                className="border border-white p-2 flex flex-col"
              >
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p>{product.description}</p>
                <p>
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <div className="self-end">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="font-semibold w-max"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    className="font-semibold w-max ms-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
};

export default ProductList;
