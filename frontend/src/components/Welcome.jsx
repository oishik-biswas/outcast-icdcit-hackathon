import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const toRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const toLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-10">
        Welcome to <span className="text-teal-500">HealthEase</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          type="button"
          onClick={toRegister}
          className="bg-teal-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-teal-600 hover:shadow-xl transition-all duration-300"
        >
          Register
        </button>
        <button
          type="button"
          onClick={toLogin}
          className="bg-teal-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-teal-600 hover:shadow-xl transition-all duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Welcome;
