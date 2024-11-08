import React, { useEffect, useState } from 'react';
import { CiFilter } from "react-icons/ci";
import {useDispatch} from 'react-redux'
import { setCategory, setStatus } from '../../context/redux/slices/filterSlice';


const FilterBtn = ({ categories, statuses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const dispatch = useDispatch()

  const handleFilter = () => {
    dispatch(setCategory(selectedCategory))
    dispatch(setStatus(selectedStatus))
    setIsOpen(false); 
  };
 

  



  return (
    <div className="relative">
      <button
        className=" text-gray-700 font-medium border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-200 flex justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiFilter className='w-6 h-6'/> Filter
      </button>

      {isOpen && (
        <div className="absolute mt-2 z-20 bg-white shadow-lg rounded-lg p-4 w-64">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value='All'>All Categories</option>
              {categories.map((category,index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value='All'>All Statuses</option>
              {statuses.map((status,index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-[#2196F3] text-white py-2 px-4 rounded w-full"
            onClick={handleFilter}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBtn;
