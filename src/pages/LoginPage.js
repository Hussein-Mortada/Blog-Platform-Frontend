import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthContext'; 
import '../css/loginregister.css';

function LoginPage() {
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [message, setMessage] = useState(''); // Initialize message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/login',
        formData
      );
      const token = response.data;
      if(token==='Login Failed!  Incorrect username or password'){
        setMessage('Login Failed!  Incorrect username or password');
      } else{

      
      const decodedToken = parseJWT(token);

      // Call the login function with user information
      login(decodedToken.userId, decodedToken.username);
      console.log(localStorage.getItem('userId'));
      console.log(localStorage.getItem('username'));

    }
    } catch (error) {
      // Handle login error, e.g., display an error message to the user
      console.error('Login failed', error);
    }
  };

  // Function to parse JWT token and extract user information
  const parseJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  return (
    <div className="login">
      <SideBar />
      <div className="login-form">
        <h2>Login</h2>
        <h2>{message}</h2>
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
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
