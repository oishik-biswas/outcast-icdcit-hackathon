import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (formData.firstName.length < 3) {
      validationErrors.firstName = "First name must be at least 3 characters";
    }
    if (formData.password.length < 6 || formData.password.length > 11) {
      validationErrors.password =
        "Password must be between 6 and 11 characters";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/users/register", {
        email: formData.email,
        fullName: { firstName: formData.firstName, lastName:formData.lastName },
        password: formData.password,
      });
      setSuccessMessage("Registration successful! Please login.");
      setFormData({ email: "", firstName: "",lastName:"", password: "" });
      setErrors({});
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="bg-[#EAF6FA] w-[100vw] h-[100vh]">
      <h2>Register</h2>
      <p className="w-[auto] bg-green-600 text-white px-5 flex justify-center">{successMessage && <p>{successMessage}</p>}</p>
      <form onSubmit={handleSubmit}>
        <div>
        <div className="flex flex-col justify-center items-center">
        
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
          />
         <p className="w-[auto] bg-red-400 text-white px-5"> {errors.firstName && <p>{errors.firstName}</p>}</p>
        <br/>
        
        <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
          />
        <br/>
        <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
          />
          <p className="w-[auto] bg-red-400 text-white px-5">{errors.email && <p>{errors.email}</p>}</p>
         <br/>
        
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange} className='ml-3 mb-5 px-3 bg-gray-200 rounded-[30px] shadow-[4px_4px_4px_4px_#add8e6]'
          />
          <p className="w-[auto] bg-red-400 text-white px-5">{errors.password && <p>{errors.password}</p>}</p>
        <br/>
        <p className="w-[auto] bg-red-400 text-white px-5">{errors.general && <p>{errors.general}</p>}</p>
        <button type="submit" className='bg-teal-200 w-[80px] '>Register</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
