import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Profile() {
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [message,setMessage] = useState("")
  // const samplePhoto = "https://i.pinimg.com/236x/c1/01/27/c10127cfeefd05a9bc1c337b421395c7.jpg"
  const samplePhoto = "https://i.pinimg.com/736x/d2/4d/3f/d24d3fe31d365d1008bfcfff8de50a8d.jpg"
  const [rentedProperty,setRentedProperty] = useState(null)
  const [saleProperty,setSaleProperty] = useState(null)
  const {isLoggedin,checkUser,isLoading,changeCurPage} = useContext(Context)

  const dataRetriever = () => {
    const local = JSON.parse(localStorage.getItem("User"))
      if(local){
        setData(local)
        if(local.email) setEmail(local.email)
        if(local.dob) setDob(local?.dob)
        if(local.phone) setPhone(local.phone)
      } else {
        checkUser()
      }
  }

  const handleEditClick = async () => {
    if(isEditing){
      if(!dob || !email || !phone){
        setMessage("All Field Required")
        return
      }
      try {
        const response = await axios.patch(
          `http://localhost:${import.meta.env.VITE_APP_PORT}/user/updatePersonalInfo`,
          {
            email,phone,dob
          },
          {
            withCredentials : true
          }
        )
        localStorage.setItem("User",JSON.stringify(response.data.user))
        setMessage(response.data.message)
      } catch (error) {
        setMessage(error.response.data.message)
        console.error(error.response.data.message,error)
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(()=>{
    changeCurPage("/profile")
    if(!isLoading && !isLoggedin) {
      navigate("/login")
    } else {
      dataRetriever()
    }
  },[checkUser,isLoggedin])

  // for fetching Rented Properties
  useEffect(()=>{
    if(!isLoggedin) return
    const retrieveListedRentedProperty = async() => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/property/listRentedProperty`,{withCredentials : true})
        setRentedProperty(response.data.rentedProperties)
      } catch (error) {
        console.error(error.response.data.message,error)
      }
    }
    retrieveListedRentedProperty()
  },[isLoggedin])

  // for fetching Sale Properties
  useEffect(()=>{
    if(!isLoggedin) return
    const retrieveListedSaleProperty = async() => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/property/listSaleProperty`,{withCredentials : true})
        setSaleProperty(response.data.saleProperties)
      } catch (error) {
        console.error(error.response.data.message,error)
      }
    }
    retrieveListedSaleProperty()
  },[isLoggedin])

  return (
    <div>
      { !isLoading && data &&
        <div className='md:ml-64 px-10'>
        <div className="py-6 flex flex-col gap-y-7">
  
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row md:justify-center md:gap-x-10 lg:gap-x-20 items-center gap-6 border border-gray-300 rounded-xl shadow-lg p-6 md:w-2/3 md:m-auto">
            
            {/* Profile Image */}
            <img
              src={samplePhoto}
              alt="Man Image"
              className="h-48 md:h-64 w-48 md:w-64 object-cover rounded-full border-4 border-gray-200 shadow-md"
            />
            
            {/* Profile Information */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0 gap-y-4">
              <div className="text-2xl md:text-3xl font-medium text-gray-700">Hi,</div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900">{data.fullName}</div>
              <div className="text-xl md:text-2xl text-gray-600">@{data.userName}</div>
            </div>
          </div>
  
          {/* Personal Information Section */}
          <div className="py-6">
            <div className="border border-gray-300 rounded-xl shadow-lg p-6 md:w-2/3 md:m-auto">
              {/* Section Header */}
              <div className="flex flex-row justify-between items-center mb-6">
                <div className="text-xl md:text-2xl font-semibold text-gray-800">Personal Information</div>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
  
              {/* Email Field */}
              <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg font-medium text-gray-700">Email</div>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{email}</div>
                )}
              </div>
              
              {/* Phone Field */}
              <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg font-medium text-gray-700">Phone</div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className=" text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{phone }</div>
                )}
              </div>
              
              {/* Date of Birth Field */}
              <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="text-lg font-medium text-gray-700">Date of Birth</div>
                {isEditing ? (
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className=" text-gray-900 border border-gray-300 rounded-md p-2"
                  />
                ) : (
                  <div className="text-xl text-gray-900">{dob}</div>
                )}
              </div>
            
              {
                message && 
                <div className='flex justify-center'>
                  <div className='text-blue-600 font-medium'>{message}</div>
                </div>
              }    
            </div>
          </div>
  
  
          {/* My Listing Section */}
          <div className="py-8">
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-6">
              {/*  Section Title  */}
              <h2 className="text-2xl font-semibold text-gray-800">My Property Listings</h2>
  
              {/*  Properties for Sale  */}
              { saleProperty && saleProperty.length>0 &&
                <div className="mt-6 border border-black p-2 rounded-md">
                <div className="text-lg font-semibold text-gray-700">Properties Listed For Sale</div>
                <div className="mt-2 text-gray-600">Total: {saleProperty.length}</div>
                <div className="flex mt-4 space-x-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Recent Listing</div>
                    <div className="flex items-center mt-2 space-x-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={saleProperty[saleProperty.length-1]?.media[0]} alt="Property Image" />
                      <div>
                        <div className="font-semibold text-gray-800">{saleProperty[saleProperty.length-1]?.title}</div>
                        <div className="text-sm text-gray-600">Price : {saleProperty[saleProperty.length-1]?.currency} {saleProperty[saleProperty.length-1]?.amount}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>navigate("/listSale")}>
                  View All
                </button>
              </div>}
  
              {/*  Properties for Rent  */}
              { rentedProperty && rentedProperty.length>0 &&
                <div className="mt-6 border border-black p-2 rounded-md">
                <div className="text-lg font-semibold text-gray-700">Properties Listed For Rent</div>
                <div className="mt-2 text-gray-600">Total: {rentedProperty?.length}</div>
                <div className="flex mt-4 space-x-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Recent Listing</div>
                    <div className="flex items-center mt-2 space-x-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={rentedProperty[rentedProperty.length-1]?.media[0]} alt="Property Image" />
                      <div>
                        <div className="font-semibold text-gray-800">{rentedProperty[rentedProperty.length-1]?.title}</div>
                        <div className="text-sm text-gray-600">Rent : {rentedProperty[rentedProperty.length-1]?.currency} {rentedProperty[rentedProperty.length-1]?.amount} {rentedProperty[rentedProperty.length-1]?.paymentTerms}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>navigate("/listRent")}>
                  View All
                </button>
              </div>}

              {/* If No Property is Listed */}
              {
                (!saleProperty || saleProperty.length===0) && (!rentedProperty || rentedProperty.length===0) &&
                <div className='flex flex-col justify-center items-center mt-4 space-y-4'>
                  <div className='text-lg font-semibold text-gray-700'>You haven't listed any properties yet.</div>
                  <button className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200' onClick={()=>navigate("/list-property")}>
                    List Your Property
                  </button>
                </div>
              }
              
            </div>
          </div>
  
          {/* Setting Section */}
          {/* <div className="py-8">
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
  
            </div>
          </div> */}
  
  
  
        </div>
      </div>}
    </div>
  );
}

export default Profile;
