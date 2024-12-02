import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropertyCard from '../Components/PropertyCard'

function Favourite() {
  const [data,setData] = useState(null)
  useEffect(()=>{
    const retrieveData = async() => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/favourite/getUserFav`,{withCredentials : true})
        setData(response.data.favProperty)
      } catch (error) {
        console.error("error in fetching user favourite Properties",error)
      }
    }
    retrieveData()
  },[])

  console.log(data)
  return (
    <div className='md:ml-64 px-10 py-5'>
      <h1>Favourites</h1>
      {/* {
        data && data.map((prop)=>(
          <PropertyCard property={prop}/>
        ))
      } */}
    </div>
  )
}

export default Favourite