import React, { useState } from 'react';
import Topic from './Topic';
import ExamPage from './ExamPage';
import Result from './Result';

function Exam() {
  const [examStarted, setExamStarted] = useState(false);
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [duration, setDuration] = useState(1); // duration in hours
  const [score, setScore] = useState(null);

  const startExam = (selectedTopic, selectedNumQuestions, selectedDuration) => {
    setTopic(selectedTopic);
    setNumQuestions(selectedNumQuestions);
    setDuration(selectedDuration);
    setExamStarted(true);
  };

  const showResult = (result) => {
    setScore(result);
  };

  return (
    <div className="exam-container min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Conditional Rendering of Components */}
        {!examStarted && !score && (
          <Topic startExam={startExam} />
        )}
        {examStarted && !score && (
          <ExamPage 
            topic={topic} 
            numQuestions={numQuestions} 
            duration={duration} 
            showResult={showResult} 
          />
        )}
        {score && <Result score={score.score} total={score.total} />}
      </div>
    </div>
  );
}

export default Exam;
