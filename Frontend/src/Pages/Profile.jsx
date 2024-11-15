import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import {useNavigate} from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("m@gmail.com");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [dob, setDob] = useState("January 1, 1990");
  const samplePhoto = "https://images.pexels.com/photos/761115/pexels-photo-761115.jpeg?auto=compress&cs=tinysrgb&w=600"
  const {isLoggedin,checkUser,isLoading} = useContext(Context)

  const dataRetriever = () => {
    const local = JSON.parse(localStorage.getItem("User"))
      if(local){
        setData(local)
      } else {
        checkUser()
      }
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(()=>{
    if(!isLoading && isLoggedin===1) {
      console.log(isLoading,isLoggedin)
      // navigate("/login")
      navigate('/login', { state: { from: location.pathname } });
    } else {
      dataRetriever()
    }
  },[checkUser,isLoggedin])


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
                  <div className="text-xl text-gray-900">{data.email}</div>
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
                  <div className="text-xl text-gray-900">{data.phone || "Not Set"}</div>
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
                  <div className="text-xl text-gray-900">{data?.dob||"Not Set"}</div>
                )}
              </div>
  
            </div>
          </div>
  
  
          {/* My Listing Section */}
          <div className="py-8">
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-6">
              {/*  Section Title  */}
              <h2 className="text-2xl font-semibold text-gray-800">My Property Listings</h2>
  
              {/*  Properties for Sale  */}
              <div className="mt-6 border border-black p-2 rounded-md">
                <div className="text-lg font-semibold text-gray-700">Properties Listed For Sale</div>
                <div className="mt-2 text-gray-600">Total: 4</div>
                <div className="flex mt-4 space-x-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Recent Listing</div>
                    <div className="flex items-center mt-2 space-x-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={samplePhoto} alt="Property Image" />
                      <div>
                        <div className="font-semibold text-gray-800">NameOfProperty</div>
                        <div className="text-sm text-gray-600">Description of the property or location.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  View All
                </button>
              </div>
  
              {/*  Properties for Rent  */}
              <div className="mt-6 border border-black p-2 rounded-md">
                <div className="text-lg font-semibold text-gray-700">Properties Listed For Rent</div>
                <div className="mt-2 text-gray-600">Total: 2</div>
                <div className="flex mt-4 space-x-6">
                  <div className="flex-1">
                    <div className="font-medium text-gray-700">Recent Listing</div>
                    <div className="flex items-center mt-2 space-x-4">
                      <img className="w-16 h-16 object-cover rounded-lg" src={samplePhoto} alt="Property Image" />
                      <div>
                        <div className="font-semibold text-gray-800">NameOfProperty</div>
                        <div className="text-sm text-gray-600">Description of the property or location.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  View All
                </button>
              </div>
              
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
