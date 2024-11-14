import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  // Cloudinary's Upload URL for unsigned uploads
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxpg55uck/image/upload";
  const UPLOAD_PRESET = "RealEstate";

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data.secure_url)
      setUploadUrl(data.secure_url); // Get the uploaded image URL
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="ml-64">
      <h2>Upload an Image to Cloudinary</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Upload</button>
      </form>

      {uploadUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadUrl} alt="Uploaded preview" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
