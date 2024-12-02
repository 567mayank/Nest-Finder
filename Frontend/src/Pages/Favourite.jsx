import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {backend} from "../Helper"
import PropertyCard from '../Components/PropertyCard'

function Favourite() {
  const [data,setData] = useState(null)
  useEffect(()=>{
    const retrieveData = async() => {
      try {
        const response = await axios.get(`${backend}/favourite/getFavPropDetails`,{withCredentials : true})
        setData(response.data.favProperty)
      } catch (error) {
        console.error("error in fetching user favourite Properties",error)
      }
    }
    retrieveData()
  },[])

  return (
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5'>
      <h1 className=' text-4xl font-bold dark:text-white'>
        Favourites &rarr;
      </h1>

      <div className='flex flex-col gap-y-5'>
        {
          data && [...data].reverse().map((prop)=>(
            <PropertyCard key={prop._id} property={prop.property} isFv={true}/>
          ))
        }
      </div>
    </div>
  )
}

export default Favourite