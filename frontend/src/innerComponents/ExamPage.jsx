// // // // import React, { useState, useEffect } from 'react';

// // // // function ExamPage({ topic, numQuestions, duration, showResult }) {
// // // //   const [questions, setQuestions] = useState([]); // State to store fetched questions
// // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // //   const [answers, setAnswers] = useState([]);
// // // //   const [examTime, setExamTime] = useState(duration * 60 * 60); // Convert hours to seconds
// // // //   const [timer, setTimer] = useState(examTime);

// // // //   // Fetch questions from the API
// // // //   useEffect(() => {
// // // //     const fetchQuestions = async () => {
// // // //       try {
// // // //         const response = await fetch('http://localhost:4000/questions');
// // // //         if (!response.ok) throw new Error('Failed to fetch questions');
// // // //         const data = await response.json();
// // // //         setQuestions(data);
// // // //       } catch (error) {
// // // //         console.error('Error fetching questions:', error);
// // // //       }
// // // //     };

// // // //     fetchQuestions();
// // // //   }, []); // Empty dependency array ensures this runs only once when component mounts

// // // //   useEffect(() => {
// // // //     if (timer > 0) {
// // // //       const interval = setInterval(() => {
// // // //         setTimer((prev) => prev - 1);
// // // //       }, 1000);

// // // //       return () => clearInterval(interval);
// // // //     } else {
// // // //       showResult(calculateResult());
// // // //     }
// // // //   }, [timer, showResult]); // Added showResult to dependency array to avoid warning

// // // //   const handleAnswer = (selectedOption) => {
// // // //     setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
// // // //     if (currentQuestion < numQuestions - 1) {
// // // //       setCurrentQuestion((prev) => prev + 1);
// // // //     } else {
// // // //       showResult(calculateResult());
// // // //     }
// // // //   };

// // // //   const calculateResult = () => {
// // // //     let score = 0;
// // // //     answers.forEach((answer, index) => {
// // // //       if (answer === questions[index]?.correct_answer) { // Check if the answer matches the correct one
// // // //         score++;
// // // //       }
// // // //     });
// // // //     return { score, total: numQuestions };
// // // //   };

// // // //   if (questions.length === 0) {
// // // //     return <div>Loading questions...</div>; // Show a loading message while fetching questions
// // // //   }

// // // //   const currentQ = questions[currentQuestion]; // Get the current question object

// // // //   // Parse the question and the options from the 'question' field
// // // //   const parseQuestion = (questionText) => {
// // // //     const regex = /([A-D]\))\s([^A-D]+)/g;
// // // //     let match;
// // // //     const parsedOptions = {};
// // // //     while ((match = regex.exec(questionText)) !== null) {
// // // //       parsedOptions[match[1]] = match[2].trim();
// // // //     }
// // // //     return parsedOptions;
// // // //   };

// // // //   // Extract the main question and options
// // // //   const optionsParsed = parseQuestion(currentQ.question);
// // // //   const mainQuestion = currentQ.question.split('\n')[2]; // Skip the first line (introductory text)

// // // //   return (
// // // //     <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
// // // //       <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
// // // //       <div className="timer text-xl font-medium text-gray-700 mb-4">
// // // //         Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
// // // //       </div>

// // // //       <div className="question-container mb-6">
// // // //         <div className="category text-lg font-semibold mb-4">{currentQ.category}</div>
// // // //         <div className="description text-md font-medium mb-4">{currentQ.description}</div>
// // // //         <div className="question text-lg font-semibold mb-4">{mainQuestion}</div>
// // // //         <div className="options space-y-3">
// // // //           {Object.entries(optionsParsed).map(([key, option], index) => (
// // // //             <button
// // // //               key={index}
// // // //               onClick={() => handleAnswer(key)} // Store the option key (e.g., 'A', 'B', etc.)
// // // //               className="w-full py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
// // // //             >
// // // //               {key} {option}
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       <div className="question-status text-center mt-4 text-gray-600">
// // // //         Question {currentQuestion + 1} of {numQuestions}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ExamPage;


// // // import React, { useState, useEffect } from "react";

// // // function ExamPage({ topic, numQuestions, duration, showResult }) {
// // //   const [questions, setQuestions] = useState([]);
// // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // //   const [answers, setAnswers] = useState([]);
// // //   const [timer, setTimer] = useState(duration * 60 * 60); // Convert hours to seconds
// // //   const [loading, setLoading] = useState(true);

// // //   // Fetch questions from the API
// // //   useEffect(() => {
// // //     const fetchQuestions = async () => {
// // //       try {
// // //         const response = await fetch("http://localhost:4000/questions");
// // //         if (!response.ok) throw new Error("Failed to fetch questions");
// // //         const data = await response.json();
// // //         setQuestions(data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error("Error fetching questions:", error);
// // //       }
// // //     };

// // //     fetchQuestions();
// // //   }, []);

// // //   // Timer countdown
// // //   useEffect(() => {
// // //     if (timer > 0) {
// // //       const interval = setInterval(() => {
// // //         setTimer((prev) => prev - 1);
// // //       }, 1000);

// // //       return () => clearInterval(interval);
// // //     } else {
// // //       // End exam if timer reaches zero
// // //       showResult(calculateResult());
// // //     }
// // //   }, [timer]);

// // //   const handleAnswer = (selectedOption) => {
// // //     const updatedAnswers = [...answers];
// // //     updatedAnswers[currentQuestion] = selectedOption;
// // //     setAnswers(updatedAnswers);

// // //     if (currentQuestion < numQuestions - 1) {
// // //       setCurrentQuestion(currentQuestion + 1);
// // //     } else {
// // //       // End exam if all questions are answered
// // //       showResult(calculateResult(updatedAnswers));
// // //     }
// // //   };

// // //   const calculateResult = (finalAnswers = answers) => {
// // //     let score = 0;
// // //     finalAnswers.forEach((answer, index) => {
// // //       if (answer === questions[index]?.correct_answer) {
// // //         score++;
// // //       }
// // //     });
// // //     return { score, total: numQuestions };
// // //   };

// // //   if (loading) {
// // //     return <div className="text-center mt-10 text-xl text-gray-500">Loading questions...</div>;
// // //   }

// // //   if (questions.length === 0) {
// // //     return <div className="text-center mt-10 text-xl text-red-500">No questions available.</div>;
// // //   }

// // //   const currentQ = questions[currentQuestion];
// // //   const parseQuestion = (questionText) => {
// // //     const regex = /([A-D]\))\s([^A-D]+)/g;
// // //     const parsedOptions = {};
// // //     let match;

// // //     while ((match = regex.exec(questionText)) !== null) {
// // //       parsedOptions[match[1]] = match[2].trim();
// // //     }

// // //     return parsedOptions;
// // //   };

// // //   const optionsParsed = parseQuestion(currentQ.question);
// // //   const mainQuestion = currentQ.question.split("\n")[2];

// // //   return (
// // //     <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
// // //       <h2 className="text-3xl font-semibold text-center mb-6 text-blue-500">Exam: {topic}</h2>
// // //       <div className="timer text-xl font-medium text-gray-700 mb-6">
// // //         Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
// // //       </div>

// // //       <div className="question-container mb-8">
// // //         <div className="category text-lg font-semibold mb-4">{currentQ.category}</div>
// // //         <div className="description text-md font-medium mb-4">{currentQ.description}</div>
// // //         <div className="question text-lg font-semibold mb-6">{mainQuestion}</div>
// // //         <div className="options space-y-4">
// // //           {Object.entries(optionsParsed).map(([key, option], index) => (
// // //             <button
// // //               key={index}
// // //               onClick={() => handleAnswer(key)}
// // //               className="w-full py-3 px-6 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
// // //             >
// // //               {key} {option}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <div className="question-status text-center mt-4 text-gray-500">
// // //         Question {currentQuestion + 1} of {numQuestions}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ExamPage;

// // import React, { useState, useEffect } from "react";

// // function ExamPage({ topic, numQuestions, duration, showResult }) {
// //   const [questions, setQuestions] = useState([]);
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [answers, setAnswers] = useState([]);
// //   const [examTime, setExamTime] = useState(duration * 60 * 60);
// //   const [timer, setTimer] = useState(examTime);

// //   // Fetch questions from the API
// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const response = await fetch("http://localhost:4000/questions");
// //         if (!response.ok) throw new Error("Failed to fetch questions");
// //         const data = await response.json();
// //         setQuestions(data); // Ensure data is an array of question objects
// //       } catch (error) {
// //         console.error("Error fetching questions:", error);
// //       }
// //     };

// //     fetchQuestions();
// //   }, []);

// //   // Timer logic
// //   useEffect(() => {
// //     if (timer > 0) {
// //       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
// //       return () => clearInterval(interval);
// //     } else {
// //       handleEndExam();
// //     }
// //   }, [timer]);

// //   // Handle answering a question
// //   const handleAnswer = (selectedOption) => {
// //     setAnswers((prevAnswers) => {
// //       const updatedAnswers = [...prevAnswers];
// //       updatedAnswers[currentQuestion] = selectedOption; // Store the answer for the current question
// //       return updatedAnswers;
// //     });

// //     if (currentQuestion < numQuestions - 1) {
// //       setCurrentQuestion((prev) => prev + 1);
// //     } else {
// //       handleEndExam();
// //     }
// //   };

// //   // Calculate result
// //   const calculateResult = () => {
// //     let score = 0;
// //     answers.forEach((answer, index) => {
// //       if (answer === questions[index]?.correct_answer) {
// //         score++;
// //       }
// //     });
// //     return { score, total: numQuestions };
// //   };

// //   const handleEndExam = () => {
// //     const result = calculateResult();
// //     showResult(result); // Pass the calculated result to the parent
// //   };

// //   if (questions.length === 0) {
// //     return <div>Loading questions...</div>;
// //   }

// //   const currentQ = questions[currentQuestion];
// //   const parseQuestion = (questionText) => {
// //     const regex = /([A-D])\)\s([^A-D]+)/g;
// //     let match;
// //     const parsedOptions = {};
// //     while ((match = regex.exec(questionText)) !== null) {
// //       parsedOptions[match[1]] = match[2].trim();
// //     }
// //     return parsedOptions;
// //   };

// //   const optionsParsed = parseQuestion(currentQ.question);
// //   const mainQuestion = currentQ.question.split("\n")[2];

// //   return (
// //     <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
// //       <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
// //       <div className="timer text-xl font-medium text-gray-700 mb-4">
// //         Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
// //       </div>

// //       <div className="question-container mb-6">
// //         <div className="category text-lg font-semibold mb-4">{currentQ.category}</div>
// //         <div className="description text-md font-medium mb-4">{currentQ.description}</div>
// //         <div className="question text-lg font-semibold mb-4">{mainQuestion}</div>
// //         <div className="options space-y-3">
// //           {Object.entries(optionsParsed).map(([key, option], index) => (
// //             <button
// //               key={index}
// //               onClick={() => handleAnswer(key)}
// //               className="w-full py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
// //             >
// //               {key}) {option}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="question-status text-center mt-4 text-gray-600">
// //         Question {currentQuestion + 1} of {numQuestions}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ExamPage;

// import React, { useState, useEffect } from "react";

// function ExamPage({ topic, numQuestions, duration, showResult }) {
//   // Static questions data
//   const staticQuestions = [
//     {
//       category: "Math",
//       description: "Basic Arithmetic",
//       question: "1) What is 2 + 2?\nA) 3\nB) 4\nC) 5\nD) 6",
//       correct_answer: "B",
//     },
//     {
//       category: "Science",
//       description: "Physics Basics",
//       question: "2) What is the acceleration due to gravity on Earth?\nA) 9.8 m/s²\nB) 10 m/s²\nC) 8.5 m/s²\nD) 7 m/s²",
//       correct_answer: "A",
//     },
//     {
//       category: "History",
//       description: "World History",
//       question: "3) Who discovered America?\nA) Christopher Columbus\nB) Vasco da Gama\nC) Ferdinand Magellan\nD) Marco Polo",
//       correct_answer: "A",
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [timer, setTimer] = useState(duration * 60 * 60); // Convert hours to seconds

//   // Timer logic
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     } else {
//       handleEndExam();
//     }
//   }, [timer]);

//   // Handle answering a question
//   const handleAnswer = (selectedOption) => {
//     setAnswers((prevAnswers) => {
//       const updatedAnswers = [...prevAnswers];
//       updatedAnswers[currentQuestion] = selectedOption; // Store the answer for the current question
//       return updatedAnswers;
//     });

//     if (currentQuestion < numQuestions - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       handleEndExam();
//     }
//   };

//   // Calculate result
//   const calculateResult = () => {
//     let score = 0;
//     answers.forEach((answer, index) => {
//       if (answer === staticQuestions[index]?.correct_answer) {
//         score++;
//       }
//     });
//     return { score, total: numQuestions };
//   };

//   const handleEndExam = () => {
//     const result = calculateResult();
//     showResult(result); // Pass the calculated result to the parent
//   };

//   if (staticQuestions.length === 0) {
//     return <div>Loading questions...</div>;
//   }

//   const currentQ = staticQuestions[currentQuestion];
//   const parseQuestion = (questionText) => {
//     const regex = /([A-D])\)\s([^A-D]+)/g;
//     let match;
//     const parsedOptions = {};
//     while ((match = regex.exec(questionText)) !== null) {
//       parsedOptions[match[1]] = match[2].trim();
//     }
//     return parsedOptions;
//   };

//   const optionsParsed = parseQuestion(currentQ.question);
//   const mainQuestion = currentQ.question.split("\n")[1]; // Extract main question

//   return (
//     <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
//       <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
//       <div className="timer text-xl font-medium text-gray-700 mb-4">
//         Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
//       </div>

//       <div className="question-container mb-6">
//         <div className="category text-lg font-semibold mb-4">{currentQ.category}</div>
//         <div className="description text-md font-medium mb-4">{currentQ.description}</div>
//         <div className="question text-lg font-semibold mb-4">{mainQuestion}</div>
//         <div className="options space-y-3">
//           {Object.entries(optionsParsed).map(([key, option], index) => (
//             <button
//               key={index}
//               onClick={() => handleAnswer(key)}
//               className="w-full py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//             >
//               {key}) {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="question-status text-center mt-4 text-gray-600">
//         Question {currentQuestion + 1} of {numQuestions}
//       </div>
//     </div>
//   );
// }

// export default ExamPage;

import React, { useState, useEffect } from "react";

function ExamPage({ topic, numQuestions, duration, showResult }) {
  // Static questions data
  const staticQuestions = [
    {
      category: "Cardiology",
      description: "Answer the mcq",
      question: "What is the primary focus of the course described?\nA) Understanding cardiac anatomy and physiology\nB) Diagnosing and treating cardiovascular diseases\nC) Learning the fundamentals of healthcare systems and management\nD) Developing surgical skills for cardiac procedures",
      correct_answer: "C",
    },
    {
      category: "Physician",
      description: "Answer the mcq",
      question: "What is the primary goal of mastering essential clinical skills in a healthcare setting?\nA) To enhance medical research and development\nB) To improve hospital administration and management\nC) To provide effective patient care and treatment\nD) To advance medical technology and equipment",
      correct_answer: "C",
    },
    {
      category: "Dietician",
      description: "Answer the mcq",
      question: "What is the primary goal of studying the science behind healthy eating and diet planning?\nA) To develop a weight loss program for athletes\nB) To understand the nutritional needs of different populations and plan balanced diets\nC) To create a business plan for a food company\nD) To research the effects of fasting on human health",
      correct_answer: "B",
    },
    {
      category: "Public Health",
      description: "Answer the mcq",
      question:"What is a primary goal of global health initiatives?\nA) To prioritize the healthcare needs of high-income countries\nB) To develop and implement solutions to address health disparities and challenges worldwide\nC) To focus solely on infectious disease control\nD) To reduce healthcare funding in low-income countries",
      correct_answer: "B",
    },
    {
      category: "Health IT",
      description: "Answer the mcq",
      question: "What is the primary focus of the field of Health IT?\nA) Developing new medical devices\nB) Transforming healthcare delivery through technology\nC) Improving patient outcomes through pharmaceutical research\nD) Enhancing healthcare administration through policy changes",
      correct_answer: "B",
    },
    {
      category: "Psychology",
      description: "Answer the mcq",
      question: "What is a primary focus of studying mental health concepts?\nA) Understanding neurological disorders\nB) Developing strategies for physical fitness\nC) Exploring ways to promote emotional well-being\nD) Analyzing cognitive development in children",
      correct_answer: "C",
    },
    {
      category: "Pharmacy",
      description: "Answer the mcq",
      question: "nWhat is the primary goal of the pharmaceutical product development process?\n\nA) To conduct clinical trials on existing medications\nB) To discover new chemical entities and formulate them into safe and effective medications\nC) To market and distribute pharmaceutical products to patients\nD) To regulate and monitor pharmaceutical manufacturing processes",
      correct_answer: "B",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(duration * 60 * 60); // Convert hours to seconds

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleEndExam();
    }
  }, [timer]);

  // Handle answering a question
  const handleAnswer = (selectedOption) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = selectedOption; // Store the answer for the current question
      return updatedAnswers;
    });

    if (currentQuestion < numQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleEndExam();
    }
  };

  // Calculate result
  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === staticQuestions[index]?.correct_answer) {
        score++;
      }
    });
    return { score, total: numQuestions };
  };

  const handleEndExam = () => {
    const result = calculateResult();
    showResult(result); // Pass the calculated result to the parent
  };

  if (staticQuestions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQ = staticQuestions[currentQuestion];

  return (
    <div className="exam-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-4">Exam: {topic}</h2>
      <div className="timer text-xl font-medium text-gray-700 mb-4">
        Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
      </div>

      <div className="question-container mb-6">
        <div className="category text-lg font-semibold mb-4 text-blue-500">{currentQ.category}</div>
        <div className="description text-md font-medium mb-4 text-gray-700">{currentQ.description}</div>
        <div className="question text-lg font-semibold mb-6">{currentQ.question.split("\n")[0]}</div>
        <div className="options space-y-3">
          {currentQ.question
            .split("\n")
            .slice(1) // Skip the main question and only keep options
            .map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option[0])} // Option key (e.g., "A")
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

