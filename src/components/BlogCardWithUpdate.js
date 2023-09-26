import React from 'react';
import '../css/blogcardupdate.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const BlogCardWithUpdate = ({ blog }) => {
  const { title, industry } = blog;
  const createdAt = new Date(blog.createdAt); 
  const formattedCreatedAt = createdAt.toLocaleDateString(); 
  const { user } = useAuth();
  const userId = user.userId;

  const handleDelete = async() =>{
    try {
      const response = await axios.post('http://localhost:8080/api/blog/delete', {
        userId: userId,
        blogId: blog.blogId
      });

      if (response.status === 200) {
        console.log('Blog deleted:', response.data);
        window.location.reload();
      } else {
        console.error('Failed to delete blog:', response.data);
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }

  };
  return (
    <div className="blog-card">
      <h2 className="blog-title">
      <Link key={blog.blogId} to={`/blog/${blog.blogId}`}>
            {title}
        </Link><br></br>
        <Link key={blog.blogId} to={`/blog/edit/${blog.blogId}`}>
            Update
        </Link>
      </h2>
      <p className="blog-user">By {user.username}</p>
      <p className="blog-created">Created {formattedCreatedAt}</p>
      <p className="blog-industry">{industry.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BlogCardWithUpdate;
