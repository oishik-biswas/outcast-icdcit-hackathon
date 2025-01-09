import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

function Result({ score, total }) {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleGoBack = () => {
    navigate('/coursespage');  // Navigate back to the course page
  };

  const handleTryAgain = () => {
    window.location.reload();  // Reload the page to try the exam again
  };

  return (
    <div className="result-container bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Exam Result</h2>
      <p className="text-xl text-center text-gray-700">
        You scored <span className="font-bold text-blue-500">{score}</span> out of <span className="font-bold text-blue-500">{total}</span>.
      </p>
      <div className="result-footer mt-6 text-center space-y-4">
        <button
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          onClick={handleTryAgain}
        >
          Try Again
        </button>
        <button
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleGoBack}
        >
          Go Back to Course Page
        </button>
      </div>
    </div>
  );
}

export default Result;
