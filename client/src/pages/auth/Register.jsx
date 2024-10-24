import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import API from "../../utils/api";



const Register = () => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"student"
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...FormData, [name]:value});

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!FormData.name || !FormData.email || !FormData.password){
      setError("All fields are required.")
      return;
    }
     try {
      await API.post('/auth/register',FormData);
      navigate('/login')

     } catch (error) {
      setError(error?.response?.data?.message || 'something went wrong')
     }
  }




  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className="w-full max-w-md bg-white p-8 shadow-md">
        <div className="border-b-[1px] pb-2">
          <h2 className="font-bold text-center text-2xl text-gray-700">
            Register
          </h2>
          <p className="text-center text-xs text-gray-500 font-semibold mt-1">
            CREATE A NEW ACCOUNT
          </p>
        </div>

        <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="name" className="block text-lg text-gray-600 mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={FormData.name}
              onChange={handleChange}
              id="name"
              placeholder="Enter your name"
              className="border-2 outline-none border-gray-300 rounded-lg px-4 py-2 text-base focus:border-[#2196F3] focus:ring-4 focus:ring-[#2195f34f] transition duration-300 ease-in-out"
            />
          </div>

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
            <label
              htmlFor="password"
              className="block text-lg text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={FormData.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter your password"
              className="border-2 outline-none border-gray-300 rounded-lg px-4 py-2 text-base focus:border-[#2196F3] focus:ring-4 focus:ring-[#2195f34f] transition duration-300 ease-in-out"
            />
          </div>
            
          <div className="mb-4 flex flex-col">
            <label htmlFor="role" className="block text-lg text-gray-600 mb-1">
              Register as:
            </label>
            <select
              name="role"
              value={FormData.role}
              onChange={handleChange}
              id="role"
              className="px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-[#2196F3]"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-[#2196F3] text-white rounded-lg py-2 text-lg font-semibold hover:bg-[#348dd6] transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>

        <div className="flex gap-1 items-center justify-center mt-2">
          <p className="text-gray-600">Already have an Account?</p>
          <Link to="/login">
          <span className="text-[#2196F3] underline font-semibold">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
