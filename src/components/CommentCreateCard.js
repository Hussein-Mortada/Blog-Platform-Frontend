import React, { useContext, useState } from 'react';
import '../css/commentcreatecard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext you created earlier

const CommentCreateCard = ({ blogId }) => {
  const { isLoggedIn } = useAuth(); // Use the isLoggedIn state from the AuthContext
  const [commentText, setCommentText] = useState('');

  const { user } = useAuth();
  const userId = user.userId;
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      // User is logged in, send the comment
      try {
        const response = await axios.post(
          'http://localhost:8080/api/comment',
          {
            userId: userId,
            blogId: blogId,
            commentText: commentText,
          }
        );
        // Handle the response as needed
        console.log('Comment submitted:', response.data);
        
        // Clear the comment input field
        setCommentText('');
        window.location.reload();
      } catch (error) {
        console.error('Comment submission failed', error);
      }
    } else {
      // User is not logged in, display a message
      alert('Must be logged in to comment');
    }
  };

  return (
    <div className="comment-create-card">
      {isLoggedIn ? (
        <form onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <label className='comment-label' htmlFor="commentText">Comment</label>
            <textarea
              id="commentText"
              name="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="4"
              cols="50"
              required
            ></textarea>
          </div>
          <button type="submit">Submit Comment</button>
        </form>
      ) : (
        <p className="comment-login-message">
          Must be logged in to comment.
        </p>
      )}
    </div>
  );
};

export default CommentCreateCard;
