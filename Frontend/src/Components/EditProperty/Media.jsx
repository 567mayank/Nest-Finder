import React, { useEffect, useRef, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";

function Media({ data }) {
  const [index, setIndex] = useState("");
  const [media, setMedia] = useState(data.media); 
  const fileInputRef = useRef()

  const handleClick = (indexImage) => {
    setIndex(indexImage)
    fileInputRef.current.click()
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      console.log(index)
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* heading */}
      <h2 className="text-xl font-semibold text-gray-700">Media</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {media.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`media-${index}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              onClick={() => handleClick(index)}
            />
            
          </div>
        ))}
        {
          media.length < 6 && 
            <div className="w-full h-64 object-cover rounded-lg shadow-md flex justify-center items-center text-zinc-900 gap-x-2 cursor-pointer" onClick={() => handleClick(media.length)}>
              <div className='flex gap-x-1'>
                <IoIosAddCircle size={25} />
                Add New Image  
              </div>
            </div>
        }
      </div>

      <div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className='opacity-0'/>
      </div>

    </div>
  );
}

export default Media;
