import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../Components/PropertyCard';
import axios from "axios"

function Home() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [propType,setPropType] = useState("All Categories")
  const [data,setData] = useState(null)

  // Fetching Properties Data
  useEffect(()=>{
    const retrieveProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/property/listAllProperty`)
        setData(response.data.properties)
      } catch (error) {
        console.error("error in fetching properties data",error)
      }
    }
    retrieveProperties()
  },[])

  // Close dropdown when clicking outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Filters --->
  
  // PropType
  const handlePropType = (str) => {
    setPropType(str)
    setIsDropdownOpen(false)
  }

  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5'>
      {/* Filter Bar */}
      <div>
        <div className="flex relative">

          <button
            id="dropdown-button"
            type="button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {propType}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              id="dropdown"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 cursor-pointer"
              style={{
                top: '110%', 
                left: '0',   
              }}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <div
                    onClick={()=>handlePropType("All Categories")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    All Categories
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>handlePropType("For Sale")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    For Sale
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>handlePropType("For Rent")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    For Rent
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>

        </div>
      </div>

      {/* Cards  */}

      <div className='flex flex-col gap-y-5'>
        { data &&
          data.map((property,index)=>(
            <PropertyCard key={property._id} property={property} />
          ))
        }
      </div>
    </div>
  );
}

export default Home;
