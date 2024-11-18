import React, { useState, useEffect, useContext } from 'react'
import {Context} from "../Context/Context.jsx"
import {useNavigate} from "react-router-dom"
import PropertyCard from '../Components/PropertyCard.jsx'
import axios from 'axios'

function UserRentedProperties() {
  const [data,setData] = useState(null)
  const {isLoggedin,changeCurPage} = useContext(Context)
  const navigate = useNavigate()
  // for fetching Rented Properties
  useEffect(()=>{
    if(!isLoggedin) {
      changeCurPage("/listRent")
      navigate("/login")
      return
    }
    navigate("/listRent")
    const retrieveListedRentedProperty = async() => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/property/listRentedProperty`,{withCredentials : true})
        setData(response.data.rentedProperties)
      } catch (error) {
        console.error(error.response.data.message,error)
      }
    }
    retrieveListedRentedProperty()
  },[])

  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5'>
      {/* Heading and Search Bar */}
      <div>
        <h1 className="text-4xl font-bold dark:text-white">Your Listed Properties For Rent &rarr;</h1>
        <div className="relative mt-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>        
      </div>

      {/* Cards */}
      <div className='flex flex-col gap-y-5'>
        { data &&
          data.map((property,index)=>(
            <PropertyCard key={property._id} property={property} Edit={true} />
          ))
        }
      </div>

    </div>
  )
}

export default UserRentedProperties