import React, { useState, useEffect } from 'react';

const mockQuestions = [
  { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: '4' },
  { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], correct: 'Paris' },
  { question: 'Which is the largest planet?', options: ['Earth', 'Jupiter', 'Mars'], correct: 'Jupiter' },
  { question: 'What is the square root of 16?', options: ['2', '4', '8'], correct: '4' },
  { question: 'Who wrote "1984"?', options: ['George Orwell', 'Mark Twain', 'J.K. Rowling'], correct: 'George Orwell' },
];

function ExamPage({ topic, numQuestions, duration, showResult }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [examTime, setExamTime] = useState(duration * 60 * 60); // Convert hours to seconds
  const [timer, setTimer] = useState(examTime);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      showResult(calculateResult());
    }
  }, [timer]);

  const handleAnswer = (selectedOption) => {
    setAnswers([...answers, selectedOption]);
    if (currentQuestion < numQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showResult(calculateResult());
    }
  };

  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correct) {
        score++;
      }
    });
    return { score, total: numQuestions };
  };

  return (
    <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
      <div className="timer text-xl font-medium text-gray-700 mb-4">
        Time Left: {Math.floor(timer / 60)}:{timer % 60}
      </div>

      <div className="question-container mb-6">
        <div className="question text-lg font-semibold mb-4">{mockQuestions[currentQuestion].question}</div>
        <div className="options space-y-3">
          {mockQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {option}
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
