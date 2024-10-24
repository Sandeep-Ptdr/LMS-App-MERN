import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("authToken", data.accessToken);
      navigate("/instructor");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-8 shadow-md">
        <div className="border-b-[1px] pb-2">
          <h2 className="font-bold text-center text-2xl text-gray-700">
            Login
          </h2>
          <p className="text-center text-xs text-gray-500 font-semibold mt-1">
            ACCESS YOUR ACCOUNT
          </p>
        </div>

        <form className="flex flex-col mt-2 " onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="block text-lg text-gray-600 mb-1">
              Email:
            </label>
            <input
              value={setFormData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border-2 outline-none border-gray-300 rounded-lg px-4 py-2 text-base focus:border-[#2196F3] focus:ring-4 focus:ring-[#2195f34f] transition duration-300 ease-in-out"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor="password"
              className="block text-lg text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              value={setFormData.password}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border-2 outline-none border-gray-300 rounded-lg px-4 py-2 text-base focus:border-[#2196F3] focus:ring-4 focus:ring-[#2195f34f] transition duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            className="bg-[#2196F3] text-white rounded-lg py-2 text-lg font-semibold hover:bg-[#348dd6] transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <div className="flex gap-1 items-center justify-center mt-2">
          <p className="text-gray-600">Don't have an Account?</p>
          <Link to="/register">
            <span className="text-[#2196F3] underline font-semibold">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
