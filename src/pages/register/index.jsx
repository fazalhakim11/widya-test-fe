import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("")
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, { name, email, password, gender });
      navigate("/");
    } catch (error) {
      setError(error.response.data.error || error.message)
      console.error(
        "Registration failed:",
        error.response.data.error || error.message
      );
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col self-center w-[60%] md:w-[40%] h-max p-3 rounded-lg mx-auto bg-[#000]"
      >
        <h2 className="text-white text-xl font-bold text-center mb-2">
          Register
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent mb-1 text-white focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent mb-1 text-white focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent mb-1 text-white focus:outline-none"
          required
        />
        <div className="flex">
          <p className="text-[#a7a7a7]">Gender:</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-transparent mb-5 ms-3 pt-1 text-white text-sm focus:outline-none"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>   
        {error && <p className="text-white mb-5">{error}</p>}
        <button
          type="submit"
          className="w-[40%] md:w-[30%] bg-white rounded-lg pb-1 mx-auto mb-3"
        >
          Register
        </button>
        <p className="text-white text-sm">
          Have an account?{" "}
          <Link to="/" className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
