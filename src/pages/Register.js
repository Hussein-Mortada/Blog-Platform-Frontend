import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import '../css/loginregister.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // Initialize message state

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
      const response = await axios.post(
        'http://localhost:8080/api/user/register',
        formData
      );
      setMessage(response.data); // Update the message state with the registration response
      
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <div className="login">
      <SideBar />
      <div className="login-form">
        <h2>Register</h2>
        <h2>{message}</h2> {/* Display the registration message */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
