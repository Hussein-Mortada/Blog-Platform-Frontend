import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BlogCard from '../components/BlogCard';
import CommentCardWithBlog from '../components/CommentCardWithBlog';

import '../css/userpage.css';

function UserPage(){

    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const { userId } = useParams();
    const [user, setusername] = useState('');
    const username = user.username;
    useEffect(() => {
        loadblogs();
    }, []);

    useEffect(() => {
        loadUser();
      }, []);

      const loadUser = async () => {
        const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
        setusername(response.data);
    };

    const loadblogs = async () => {
        const response = await axios.get(`http://localhost:8080/api/blog/user/${userId}`);
        setBlogs(response.data);
    };


    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {
        const response = await axios.get(`http://localhost:8080/api/comment/user/${userId}`);
        setComments(response.data);
    };


    return(
        <div className='user-page'>
            <SideBar />
            <h1>{username} Activity</h1>
            <div className='user-blogs-comments'>
            <div className='user-blogs'>
            {username} 's blogs
                {blogs.map(blog=>(
                    <div key={blog.blogId} className='blogCard'>
                        <BlogCard blog={blog}/>
                    </div>
                ))}
            </div>
            <div className='user-comments'>
            {username} 's comments
                {comments.map(comment=>(
                    <div key={comment.commentId} className='commentCard'>
                        <CommentCardWithBlog comment={comment}/>
                    </div>
                ))}
            </div>
            </div>
            <Footer/>

        </div>

    );
}

export default UserPage;