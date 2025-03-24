import React, { useState } from 'react';

export default function FileUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) {
        onFileSelect(file); // Pass the selected file to the parent component
      }
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px', margin: '0 auto' }}>
      <label htmlFor="fileInput" style={{ display: 'block', marginBottom: '10px' }}>
        Upload a file:
      </label>
      <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'block', marginBottom: '10px' }} />
      {fileName && <p>Selected File: {fileName}</p>}
    </div>
  );
}
