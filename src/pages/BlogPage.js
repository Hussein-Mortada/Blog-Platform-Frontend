import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BlogFull from '../components/BlogFull';
import CommentCard from '../components/CommentCard';
import CommentCreateCard from '../components/CommentCreateCard';
import '../css/blogpage.css';
function BlogPage() {
  const [blog, setBlog] = useState(null); // Initialize with null
  const [comments,setComments] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    loadBlog();
  }, [blogId]);

  useEffect(() => {
    loadComments();
  }, [blogId]);

  const loadComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/comment/blog/${blogId}`);
      setComments(response.data.reverse());
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments(null); 
    }
  };



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
    <div className='blog-page'>
      <SideBar />
      <div className='main-blog'>
        {blog === null ? (
          <p className="no-blog-found">No such blog found.</p>
        ) : (
          <BlogFull blog={blog} />
        )}
        <h2 className='comments-head'>Comments:</h2>

        <CommentCreateCard blogId={blogId}/>
        {comments.length > 0  ? (
          <div className='comment-section'>
          
          {comments.map(comment =>(
            <div key={comment.commentId} className='comment-card'>
                        <CommentCard comment={comment}/>
            </div>
          ))}
          </div>
        ) : (
          <p className="no-comments-found">No comments for this blog yet! Be the first!</p>
          //<CommentCreate blog={blog} />
        )}


      </div>
      <Footer />
    </div>
  );
}

export default BlogPage;
