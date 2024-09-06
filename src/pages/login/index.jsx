import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../stores/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
    dispatch(loginUser({ email, password }));
    navigate("/profile");
  };

  return (
    <div className="w-[100%] h-[100vh] flex">
      <form onSubmit={handleSubmit} className="flex flex-col self-center w-[60%] md:w-[30%] h-max p-3 rounded-lg mx-auto bg-[#000]">
        <h1 className="text-white text-xl font-bold text-center mb-2">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="bg-transparent mb-1 text-white focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="bg-transparent mb-5 text-white focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-[40%] md:w-[30%] bg-white rounded-lg pb-1 mx-auto mb-3">Login</button>
        <p className="text-white text-sm">Dont have an account? <Link to="/register" className="font-bold">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
