import React from 'react';
import '../css/commentcard.css';
import { Link } from 'react-router-dom';

const CommentCard = ({ comment }) => {
  const commenttext = comment.commenttext;
  const username = comment.username;
  const createdAt = new Date(comment.createdAt); 
  const formattedCreatedAt = createdAt.toLocaleDateString(); 
  
  return (
    <div className="comment-card">
      <Link key={comment.blogId} to={`/blog/${comment.blogId}`}>
      <p className="comment-user">Blog</p>
        </Link>
      <p className="comment-created">Created {formattedCreatedAt}</p>
      <p className="comment-text">{commenttext}</p>
    </div>
  );
};

export default CommentCard;
