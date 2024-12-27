import axios from 'axios';
import React, { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { backend } from '../Helper';

function InitialMsgBox({
  data,
  setOpen
}) {
  const [input, setInput] = useState("");
  const [approval, setApproval] = useState(false);
  const [message, setMessage] = useState("")

  const handleSubmit = async() => {
    if (!approval || !input) {
      setMessage("All field Required")
      return;
    }

    try {
      const response = await axios.put(
        `${backend}/user/sendRequest/${data.owner._id}`,
        {
          propertyId : data._id,
          message : input
        },
        {withCredentials : true}
      )
      console.log(response)
    } catch (error) {
      console.error("error in sending request", error)
    }
  }

  // console.log(data.owner)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="w-1/3 h-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">For {data.title}</h2>
          <h3>Send a message to the owner: {data.owner.fullName}</h3>
        </div>
        <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-900">
          <IoIosCloseCircle size={30} />
        </button>
      </div>


        {/* Informational Text */}
        <p className="text-sm text-red-500">
          This will be your first message to the property owner. After sending your message, the owner will review your request and either accept or reject it based on the details you provide.
        </p>

        <div className="space-y-2">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            maxLength={200} 
            placeholder="Enter your text" 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Are you interested in {data.listingType === "Rent" ? "Rent" : "Buy"}ing property?</label>
            <input 
              type="checkbox" 
              checked={approval} 
              onChange={(e) => setApproval(e.target.checked)} 
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <button 
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default InitialMsgBox;
