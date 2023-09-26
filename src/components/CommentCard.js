import React from 'react';
import '../css/commentcard.css';
import { Link } from 'react-router-dom';

const CommentCard = ({ comment }) => {
  const commenttext = comment.commenttext;
  const username = comment.username;
  const createdAt = new Date(comment.createdAt); 
  const formattedCreatedAt = createdAt.toLocaleDateString(); 
  
  return (
    <div className="comment-card-container">
      <Link key={comment.userId} to={`/user/${comment.userId}`}>
      <p className="comment-user">By {username}</p>
        </Link>
      <p className="comment-created">Created {formattedCreatedAt}</p>
      <p className="comment-text">{commenttext}</p>
    </div>
  );
};

export default CommentCard;
