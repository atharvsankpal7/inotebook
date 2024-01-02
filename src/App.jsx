import React, { useState } from 'react';

const YourComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/api/image/postimage', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.warn('No file selected');
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-1">
          Image <span className="font-css top">*</span>
          <div className="">
            <input
              type="file"
              id="file-input"
              name="ImageStyle"
              onChange={handleFileChange}
            />
          </div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default YourComponent;
