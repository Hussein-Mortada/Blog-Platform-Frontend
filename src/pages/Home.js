import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BlogCard from '../components/BlogCard';

function Home(){

    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        loadblogs();
    }, []);

    const loadblogs = async () => {
        const result = await axios.get("http://localhost:8080/api/blog");
        setBlogs(result.data.reverse());
    };


    return(
        <div className='home'>
            <SideBar />
            <div className='main-home'>
                <h2 className='newest'>Newest Blogs</h2>
                {blogs.map(blog=>(
                    <div key={blog.blogId} className='blogCard'>
                        <BlogCard blog={blog}/>
                    </div>
                ))}
            </div>
            <Footer/>

        </div>

    );
}

export default Home;