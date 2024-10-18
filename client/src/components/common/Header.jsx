import React from "react";
import { RiMenu3Line } from "react-icons/ri";
import white from "../../assets/white.svg";
import profilepng from '../../assets/profilepng.png'

const Header = () => {
  return (
    <header className=" w-full h-16 bg-[#2196F3] flex p-3 items-center justify-between ">

      <div className="flex items-center">
         <span className="font-bold cursor-pointer text-gray-300 hover:text-gray-50 mr-4">
         <RiMenu3Line className="w-6 h-6" />
         </span>

         <div className="ml-2">
         <span className="text-white flex gap-1 cursor-pointer">
            <img src={white} alt="" className="" />
            <h1 className="font-semibold text-3xl">Logo</h1>
         </span>
         </div>
      </div>

      <div className="rounded-full w-10 h-10 overflow-hidden flex justify-center items-center border-2 border-gray-300 cursor-pointer">
         <img src={profilepng} alt="profile" className="w-11 h-11 bg-gray-300 object-center object-cover" />
      </div>
    </header>
  );
};

export default Header;
