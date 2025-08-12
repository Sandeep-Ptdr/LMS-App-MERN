import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const ResetPassword = () => {
  const [FormData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FormData.email || !FormData.otp || !FormData.newPassword) {
      setError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      await API.post("/auth/reset-password", FormData);
      navigate("/login");
    } catch (error) {
      console.error("errorr", error);
      if (error.message === "Network Error") return setError("Network Error");
      setError(error?.response?.data?.error || error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative ">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="loader"></div>
        </div>
      )}
      <div
        className={`w-full max-w-md bg-gray-50 p-8 shadow-md rounded-md ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="border-b-[1px] pb-2">
          <h2 className="font-bold text-center text-2xl text-gray-700">
            Reset Password
          </h2>
          
        </div>

        <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="block text-lg text-gray-600 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={FormData.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email"
              className="border-2 outline-none border-gray-300 rounded-lg px-4 py-2 text-base focus:border-[#2196F3] focus:ring-4 focus:ring-[#2195f34f] transition duration-300 ease-in-out"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="block text-lg text-gray-600 mb-1">
              Otp:
            </label>
            <input
              type="otp"
              name="otp"
              value={FormData.otp}
              onChange={handleChange}
              id="otp"
              placeholder="Enter Otp"
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
              type="password"
              name="newPassword"
              value={FormData.newPassword}
              onChange={handleChange}
              id="newPassword"
              placeholder="Enter your new password"
              className="border-2 outline-none border-gray-300 rounded-lg px-4 py-2 text-base focus:border-[#2196F3] focus:ring-4 focus:ring-[#2195f34f] transition duration-300 ease-in-out"
            />
          </div>

          {error && <p className="text-red-500 mb-1">{error}</p>}
          <button
            type="submit"
            className="bg-[#2196F3] text-white rounded-lg py-2 text-lg font-semibold hover:bg-[#348dd6] transition duration-300 ease-in-out"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
