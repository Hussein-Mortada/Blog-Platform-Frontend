import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import EditBlog from '../components/EditBlog';

function EditBlogPage() {
  const [blog, setBlog] = useState(null); // Initialize with null
  const { blogId } = useParams();
  
  useEffect(() => {
    loadBlog();
  }, [blogId]);

  const loadBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/blog/${blogId}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error loading blog:', error);
      setBlog(null);
    }
  };


  return (
    <div className="blog-page">
      <SideBar />
      <div className="main-blog">
        <h1>Editing Blog</h1>
        {blog === null ? (
          <p className="no-blog-found">No such blog found.</p>
        ) : (
          <EditBlog blog={blog} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EditBlogPage;
