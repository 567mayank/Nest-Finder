import React, { useState } from 'react';

function Profile() {
  // State for managing the profile data
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("m@gmail.com");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [dob, setDob] = useState("January 1, 1990");

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='md:ml-64 px-10'>
      <div className="py-6 flex flex-col gap-y-7">

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row md:justify-center md:gap-x-10 lg:gap-x-20 items-center gap-6 border border-gray-300 rounded-xl shadow-lg p-6 md:w-2/3 md:m-auto">
          
          {/* Profile Image */}
          <img
            src="https://images.pexels.com/photos/761115/pexels-photo-761115.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Man Image"
            className="h-48 md:h-64 w-48 md:w-64 object-cover rounded-full border-4 border-gray-200 shadow-md"
          />
          
          {/* Profile Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0 gap-y-4">
            <div className="text-2xl md:text-3xl font-medium text-gray-700">Hi,</div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900">John Doe</div>
            <div className="text-xl md:text-2xl text-gray-600">@JohnDoe</div>
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
                <div className="text-xl text-gray-900">{phone}</div>
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

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
