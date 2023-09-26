import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthContext';
import '../css/addblog.css';
function AddBlogPage() {
  const { user } = useAuth();
  const userId = user.userId;
  const [industries, setIndustries] = useState([]);

  const [blogData, setBlogData] = useState({
    title: '',
    blogText: '',
    industryId: 1, // Default industry ID, you can change this
  });

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/industry/all");
      setIndustries(result.data);
    } catch (error) {
      console.error('Error loading industries:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/blog/add', {
        userId: userId,
        title: blogData.title,
        blogText: blogData.blogText,
        industryId: blogData.industryId,
      });

      if (response.status === 200) {
        console.log('Blog added:', response.data);
      } else {
        console.error('Failed to add blog:', response.data);
      }
    } catch (error) {
      console.error('Failed to add blog:', error);
    }
  };

  return (
    <div className="add-blog-page">
      <SideBar />
      <div className="main-add-blog">
        <h1>Add a Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="blogText">Blog Text</label>
            <textarea
              id="blogText"
              name="blogText"
              value={blogData.blogText}
              onChange={handleChange}
              rows="10"
              cols="50"
              required
            />
          </div>
          <div className="form-group">
            <p className="blog-full-industry">
          <label htmlFor="industryId">Industry:</label>
          <select
            id="industryId"
            name="industryId"
            value={blogData.industryId}
            onChange={handleChange}
          >
            {industries.map((industry) => (
              <option key={industry.industryId} value={industry.industryId}>
                {industry.name}
              </option>
            ))}
          </select>
        </p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddBlogPage;
