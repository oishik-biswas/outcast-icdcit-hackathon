import React, { useState } from 'react';

function MinimizedPDF() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={handleFileChange} 
      />
      {file && (
        <div>
          <h3>Uploaded PDF: {file.name}</h3>
          <p>File size: {file.size} bytes</p>
        </div>
      )}
    </div>
  );
}

export default MinimizedPDF;
