import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProducts } from '../../stores/slices/productSlice';

const EditProduct = ({setIsEditing, id, pname, desc, pprice}) => {
  const [name, setName] = useState(pname);
  const [description, setDescription] = useState(desc);
  const [price, setPrice] = useState(pprice);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      { name, description, price },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setIsEditing(null)
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
      <div className='self-end'>
      <button onClick={()=>setIsEditing(null)} type="submit" className='font-semibold w-max'>Cancel</button>
      <button onClick={handleSubmit} type="submit" className='font-semibold w-max ms-3'>Save</button>
      </div>
    </form>
  );
};

export default EditProduct;
