import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BlogCardWithUpdate from '../components/BlogCardWithUpdate';
import CommentCardWithBlogDelete from '../components/CommentCardWithBlogDelete';
import { useAuth } from '../context/AuthContext'; 
import '../css/userpage.css';

function ProfilePage(){

    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const { user } = useAuth();
    const username = user.username;
    const userId = user.userId;

    useEffect(() => {
        loadblogs();
    }, []);


    const loadblogs = async () => {
        const response = await axios.get(`http://localhost:8080/api/blog/user/${userId}`);
        setBlogs(response.data.reverse());
    };


    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {
        const response = await axios.get(`http://localhost:8080/api/comment/user/${userId}`);
        setComments(response.data.reverse());
    };


    return (
        <div className='user-page'>
            <SideBar />
            <h1>Your Activity</h1>
            <div className='user-blogs-comments'>
                <div className='user-blogs'>
                    <h2>Your blogs</h2>
                    <Link to="/blog/add" className="add-blog-button">Add a Blog</Link> 
                    {blogs.map(blog=>(
                        <div key={blog.blogId} className='blogCard'>
                            <BlogCardWithUpdate blog={blog}/>
                        </div>
                    ))}
                </div>
                <div className='user-comments'>
                    <h2>Your comments</h2>
                    {comments.map(comment=>(
                        <div key={comment.commentId} className='commentCard'>
                            <CommentCardWithBlogDelete comment={comment}/>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProfilePage;
