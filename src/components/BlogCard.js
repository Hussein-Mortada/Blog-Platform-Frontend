import React from 'react';
import '../css/blogcard.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, user, industry } = blog;
  const createdAt = new Date(blog.createdAt); 
  const formattedCreatedAt = createdAt.toLocaleDateString(); 
  
  return (
    <div className="blog-card">
      <h2 className="blog-title">
      <Link className='bloglink' key={blog.blogId} to={`/blog/${blog.blogId}`}>
            {title}
        </Link>
      </h2>
      <p className="blog-user">By {user.username}</p>
      <p className="blog-created">Created {formattedCreatedAt}</p>
      <p className="blog-industry">{industry.name}</p>
    </div>
  );
};

export default BlogCard;
