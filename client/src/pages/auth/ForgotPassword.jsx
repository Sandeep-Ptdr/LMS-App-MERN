import React from 'react'
import { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
 const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [error, setError] = useState(null);

   const navigate = useNavigate();
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       setLoading(true);
       const { data } = await API.post("/auth/forgot-password", formData);
         if(data.success){
            navigate('/reset-password')
         }
     } catch (error) {
       console.error(error);
       setError(error);
     } finally {
       setLoading(false);
     }
   };



 
   return (
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100  ">
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
             Forgot Password
           </h2>
          
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
 
           
 
           {error && (
             <p className="text-red-500 text-sm mb-2">
               {error?.response?.data?.message || error?.message}
             </p>
           )}
           <button
             type="submit"
             className="bg-[#2196F3] text-white rounded-lg py-2 text-lg font-semibold hover:bg-[#348dd6] transition duration-300 ease-in-out"
           >
              Get Otp
           </button>
         </form>
 
         
 
          
       </div>
     </div>
  )
}

export default ForgotPassword