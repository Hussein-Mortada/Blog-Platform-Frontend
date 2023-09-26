import React from 'react';
import '../css/blogfull.css';
import { Link } from 'react-router-dom';

const BlogFull = ({ blog }) => {
  const { title, user, industry } = blog;

  return (
    <div className="blog-full">
      <h2 className="blog-full-header">
      {title}
      </h2>
      <Link key={user.userId} to={`/user/${user.userId}`}>
            By : {user.username}
        </Link>
      <p className="blog-full-industry">{industry.name}</p>
      <div className='blogtext'>
        {blog.blogtext}
      </div>
    </div>
  );
};

export default BlogFull;
