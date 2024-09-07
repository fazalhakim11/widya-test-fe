import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProducts } from '../../stores/slices/productSlice';

const ProductCreate = ({setShow, show}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products`,
      { name, description, price },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setName("")
    setDescription("")
    setPrice("")
    setShow(!show)
    dispatch(fetchProducts(token))
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col border border-white p-2'>
      <input 
        type="text" 
        placeholder="Product Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className='bg-transparent focus:outline-none'
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        className='bg-transparent focus:outline-none' 
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
        className='bg-transparent focus:outline-none' 
      />
      <button type="submit" className='font-semibold w-max self-end'>Add Product</button>
    </form>
  );
};

export default ProductCreate;
