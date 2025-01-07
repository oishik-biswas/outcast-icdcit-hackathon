import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/users/login', formData);
      // Assuming the backend returns a JWT token after login
      localStorage.setItem('authToken', response.data.token);
      setSuccessMessage('Login successful!');
      setErrors({});  
      navigate('/home'); 
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || {});
        console.log(err.msg);
      }
    }
  };

  return (
    <div className='bg-[#EAF6FA] w-[100vw] h-[100vh]'>
      <h2>Login Form</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center flex-col'>
        
          <label>First name</label>
          <input type='text' name='firstname' value={formData.firstname}
             onChange={handleChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
            /><br/>
            <label>Last name</label>
          <input type='text' name='lastname' value={formData.lastname}
             onChange={handleChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
            /><br/>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
            required
          />
          {errors.email && <p>{errors.email}</p>}
        <br/>

    
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
            required
          />
          {errors.password && <p>{errors.password}</p>}
        <br/>

        <button type="submit" className='bg-teal-200 w-[80px] '>Login</button>
        </div>
      </form>
      
    </div>
    
  );
};

export default Login;
