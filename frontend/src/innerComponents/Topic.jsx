import React, { useState } from 'react';

function Topic({ startExam }) {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [duration, setDuration] = useState(1); // duration in hours

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the values to the Exam component
    startExam(topic, numQuestions, duration);
  };

  return (
    <div className="topic-selection bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select Your Exam Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-lg font-medium text-gray-700 mb-2">
            Topic:
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="numQuestions" className="block text-lg font-medium text-gray-700 mb-2">
            Number of Questions:
          </label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            min="1"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-lg font-medium text-gray-700 mb-2">
            Duration (in hours):
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Start Exam
          </button>
        </div>
      </form>
    </div>
  );
}

export default Topic;
