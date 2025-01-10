import React, { useState, useEffect } from 'react';

function ExamPage({ topic, numQuestions, duration, showResult }) {
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [examTime, setExamTime] = useState(duration * 60 * 60); // Convert hours to seconds
  const [timer, setTimer] = useState(examTime);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      showResult(calculateResult());
    }
  }, [timer, showResult]); // Added showResult to dependency array to avoid warning

  const handleAnswer = (selectedOption) => {
    setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
    if (currentQuestion < numQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      showResult(calculateResult());
    }
  };

  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index]?.correct_answer) { // Check if the answer matches the correct one
        score++;
      }
    });
    return { score, total: numQuestions };
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>; // Show a loading message while fetching questions
  }

  const currentQ = questions[currentQuestion]; // Get the current question object

  // Parse the question and the options from the 'question' field
  const parseQuestion = (questionText) => {
    const regex = /([A-D]\))\s([^A-D]+)/g;
    let match;
    const parsedOptions = {};
    while ((match = regex.exec(questionText)) !== null) {
      parsedOptions[match[1]] = match[2].trim();
    }
    return parsedOptions;
  };

  // Extract the main question and options
  const optionsParsed = parseQuestion(currentQ.question);
  const mainQuestion = currentQ.question.split('\n')[2]; // Skip the first line (introductory text)

  return (
    <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
      <div className="timer text-xl font-medium text-gray-700 mb-4">
        Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
      </div>

      <div className="question-container mb-6">
        <div className="category text-lg font-semibold mb-4">{currentQ.category}</div>
        <div className="description text-md font-medium mb-4">{currentQ.description}</div>
        <div className="question text-lg font-semibold mb-4">{mainQuestion}</div>
        <div className="options space-y-3">
          {Object.entries(optionsParsed).map(([key, option], index) => (
            <button
              key={index}
              onClick={() => handleAnswer(key)} // Store the option key (e.g., 'A', 'B', etc.)
              className="w-full py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {key} {option}
            </button>
          ))}
        </div>
      </div>

      <div className="question-status text-center mt-4 text-gray-600">
        Question {currentQuestion + 1} of {numQuestions}
      </div>
    </div>
  );
}

export default ExamPage;
