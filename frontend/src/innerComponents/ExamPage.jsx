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
        const response = await fetch(`http://localhost:4000/questions`); // Adjust the endpoint as needed
        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedQuestions = data.map((item) => {
            const { description, question, correct } = item;

            // Validate the data before processing
            if (description && question && correct) {
              // Check if the question has multiple parts
              const questionParts = question.split('\n');

              // Ensure the question format has at least 4 parts (description, question, options, correct answer)
              if (questionParts.length < 5) {
                console.error('Invalid question format (too few parts):', item);
                return null;
              }

              // Extract the question text (this will be the second line after the description)
              const questionText = questionParts[1].trim();

              // Extract options, assuming they are listed between the second and last line
              const optionsList = questionParts.slice(2, -1).map(option => option.trim());

              // Extract the correct answer from the last line after "Correct answer:"
              const correctAnswer = questionParts[questionParts.length - 1]?.split(':')[1]?.trim();

              // Ensure the correct answer exists and options are available
              if (!correctAnswer || optionsList.length === 0) {
                console.error('Invalid question format (missing options or correct answer):', item);
                return null;
              }

              return {
                description,
                questionText,
                optionsList,
                correct: correctAnswer,
              };
            } else {
              console.error('Invalid question format (missing description, question, or correct answer):', item);
              return null;
            }
          }).filter(Boolean); // Remove invalid questions

          setQuestions(formattedQuestions); // Store valid questions
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [topic]); // Fetch questions again if the topic changes

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
    setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
    if (currentQuestion < numQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showResult(calculateResult());
    }
  };

  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index]?.correct) { // Check if the answer matches the correct one
        score++;
      }
    });
    return { score, total: numQuestions };
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>; // Show a loading message while fetching questions
  }

  const currentQ = questions[currentQuestion]; // Get the current question object

  return (
    <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
      <div className="timer text-xl font-medium text-gray-700 mb-4">
        Time Left: {Math.floor(timer / 60)}:{timer % 60}
      </div>

      <div className="question-container mb-6">
        <div className="question text-lg font-semibold mb-4">{currentQ.description}</div>
        <div className="question text-lg font-semibold mb-4">{currentQ.questionText}</div>
        <div className="options space-y-3">
          {currentQ.optionsList.map((option, index) => (
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
