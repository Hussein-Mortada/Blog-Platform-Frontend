import React, { useEffect, Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import '../css/sidebarcss.css';
function Sidebar() {

    const [industries, setIndustries] = useState([]);
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = async (e) => {
        logout();
      };


    useEffect(() => {
        loadIndustries();
    }, []);

    const loadIndustries = async () => {
        const result = await axios.get("http://localhost:8080/api/industry/all");
        setIndustries(result.data);
    };

    

    return (
      <div className="sidebar">
        <Link to="/">Home</Link>
        {industries.map((industry) => (
          <Link key={industry.industryId} to={`/industry/${industry.industryId}`}>
            {industry.name}
          </Link>
        ))}
        {isLoggedIn ? (
        <div>
            <Link to="/profile">Profile</Link>
            <button className='beautiful-button' onClick={handleLogout}>Logout</button>
        </div>
        ) : (
          <div>
            <Link to="/login">Login</Link><br></br>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    );
}

export default Sidebar;
