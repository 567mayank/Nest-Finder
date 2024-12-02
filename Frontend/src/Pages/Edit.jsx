import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Basic from '../Components/EditProperty/Basic'
import Details from '../Components/EditProperty/Details'
import Media from '../Components/EditProperty/Media'
import Pricing from '../Components/EditProperty/Pricing'
import Confirmation from '../Components/EditProperty/Confirmation'
import { isLoggedin } from '../helper'

function Edit() {
  const [data,setData] = useState(null)
  const {propertyId} = useParams()
  const navigate = useNavigate()

  // Authorization
  // useEffect(()=>{
  //   // changeCurPage(`/edit/${propertyId}`)
  //   if(!isLoggedin()){
  //     navigate("/login")
  //   }
  // })

  // fetching property data
  useEffect(()=>{
    const retrievePropertyData = async () => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/property/listSingleProperty/${propertyId}`)
        setData(response.data.property)
        // console.log(response.data.property)
      } catch (error) {
        console.error(error)
      }
    }
    retrievePropertyData()
  },[])
  
  return (
    
    <div className='md:ml-64 px-2 md:px-20 py-5 flex flex-col gap-y-5' >
      { data &&
        <div className=' flex flex-col gap-y-7'>
          <Basic data={data}/>
          <Details data={data}/>
          <Media data={data}/>
          <Pricing data={data}/>
          <Confirmation data={data}/>
        </div>
      }
    </div>
  )
}

export default Edit