import React, { useState } from 'react';

function Media({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [media, setMedia] = useState(data.media); // Store the images in state

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle file selection
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newMedia = [...media];
      newMedia[index] = URL.createObjectURL(file); // Update the image at the index with the selected file
      setMedia(newMedia);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Media</h2>
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {media.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`media-${index}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            {isEditing && (
              <div className="absolute bottom-2 left-2">
                <label htmlFor={`file-input-${index}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md cursor-pointer">
                  Update
                </label>
                <input
                  type="file"
                  id={`file-input-${index}`}
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Media;
