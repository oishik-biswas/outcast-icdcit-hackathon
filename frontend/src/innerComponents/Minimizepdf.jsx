import React, { useState } from 'react';
import SideBar from '../components/SideBar';

function MinimizedPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [summary, setSummary] = useState(''); // State for the summary

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setResponse('');
    setSummary(''); // Clear summary before upload

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
    
      if (response.ok) {
        setResponse(`✅ Success: ${result.message || 'File uploaded successfully!'}`);
        setSummary(result.summary || 'No summary provided.'); // Update summary
      } else {
        setResponse(`❌ Error: ${result.error || 'Upload failed'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setResponse('❌ Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#d4f3fd] min-h-screen">
      <div className="hidden md:block fixed w-64">
        <SideBar />
      </div>
      <div className="flex-1 ml-0 md:ml-[100px] p-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          {file && (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-full">
              <h3 className="text-lg font-medium text-gray-800">Uploaded PDF:</h3>
              <p className="text-gray-600 truncate">{file.name}</p>
              <p className="text-gray-600">File size: {file.size} bytes</p>
            </div>
          )}
          <button
            onClick={handleFileUpload}
            disabled={loading}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>
          {response && (
            <div
              className={`mt-4 text-center text-lg ${
                response.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {response}
            </div>
          )}
          {summary && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-medium text-gray-800">Summary:</h3>
              <p className="text-gray-600">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MinimizedPDF;
