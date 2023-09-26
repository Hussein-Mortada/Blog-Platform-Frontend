import React from 'react';
import '../css/commentcard.css';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';

const CommentCardWithBlogDelete = ({ comment }) => {
  const commenttext = comment.commenttext;
  const createdAt = new Date(comment.createdAt);
  const formattedCreatedAt = createdAt.toLocaleDateString();

  // Function to handle comment deletion
  const handleDeleteComment = async () => {
    try {
      // Send a request to delete the comment
      await axios.post('http://localhost:8080/api/comment/delete', {
        commentId: comment.commentId,
        userId: comment.userId,
      });
      window.location.reload();
    } catch (error) {
      console.error('Comment deletion failed', error);
    }
  };

  return (
    <div className="comment-card">
      <Link key={comment.blogId} to={`/blog/${comment.blogId}`}>
        <p className="comment-user">Blog</p>
      </Link>
      <p className="comment-created">Created {formattedCreatedAt}</p>
      <p className="comment-text">{commenttext}</p>
      <button className="delete-button" onClick={handleDeleteComment}>
        Delete
      </button>
    </div>
  );
};

export default CommentCardWithBlogDelete;
