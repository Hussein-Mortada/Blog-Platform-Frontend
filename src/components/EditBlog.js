import React, { useEffect, useState } from 'react';
import '../css/blogfull.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const EditBlog = ({ blog }) => {
  const { blogId, title, industry } = blog;
  const [industries, setIndustries] = useState([]);
  const [editedBlog, setEditedBlog] = useState({
    title: title,
    blogtext: blog.blogtext,
    industryId: industry.industryId,
  });
  const { user } = useAuth();
  const userId = user.userId;

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

    const parsedValue = name === 'industryId' ? parseInt(value, 10) : value;

    setEditedBlog({
      ...editedBlog,
      [name]: parsedValue,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/blog/update`,
        {
          blogId: blogId,
          userId: userId,
          title: editedBlog.title,
          blogText: editedBlog.blogtext,
          industryId: editedBlog.industryId,
        }
      );
      console.log('Blog updated:', response.data);
      // You can add additional logic here, such as showing a success message.
    } catch (error) {
      console.error('Blog update failed', error);
      // You can handle errors here, e.g., displaying an error message.
    }
  };

  return (
    <div className="blog-full">
      <form>
        <h2 className="blog-full-header">
          <input
            type="text"
            name="title"
            value={editedBlog.title}
            onChange={handleChange}
          />
        </h2>
        <p className="blog-full-industry">
          <label htmlFor="industryId">Industry:</label>
          <select
            id="industryId"
            name="industryId"
            value={editedBlog.industryId}
            onChange={handleChange}
          >
            {industries.map((industry) => (
              <option key={industry.industryId} value={industry.industryId}>
                {industry.name}
              </option>
            ))}
          </select>
        </p>
        <div className="blogtext">
          <textarea
            name="blogtext"
            value={editedBlog.blogtext}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
