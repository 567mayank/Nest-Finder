import React, { useState } from 'react';

function Media({ handleSubmit }) {
  const [files, setFiles] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Limit the total number of files to 5
    if (files.length + selectedFiles.length <= 5) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else {
      alert('You can upload up to 5 files only.');
    }
  };

  // Array to create 5 file input fields dynamically
  const inputFields = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className='px-20 py-10 h-screen md:ml-64 sm:m-auto'>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
          Upload Files (up to 5)
        </label>

        <div className='flex flex-col gap-y-5'>
          {inputFields.map((_, index) => (
            <input
              key={index}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id={`file_input_${index}`}
              type="file"
              accept={index === 0 ? 'image/*' : 'image/*,video/*'}
              onChange={handleFileChange}
              required={index === 0 ? true : false}
            />
          ))}
        </div>

        {/* Display file previews */}
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Preview</h3>
            <div className="flex space-x-4">
              {files.map((file, index) => (
                <div key={index} className="flex flex-col items-center">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index}`}
                      className="w-20 h-20 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <video
                      controls
                      src={URL.createObjectURL(file)}
                      className="w-20 h-20 object-cover rounded-md mb-2"
                    />
                  )}
                  <span className="text-xs text-center">{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center mt-10"
        >
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>

      </form>
    </div>
  );
}

export default Media;
