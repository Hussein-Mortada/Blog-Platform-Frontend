import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BlogCard from '../components/BlogCard';

function IndustryPage(){

    const [blogs, setBlogs] = useState([]);
    const { industryId } =useParams(); 

    useEffect(() => {
        loadblogs();
    }, [industryId]);

    const loadblogs = async () => {
        const result = await axios.get(`http://localhost:8080/api/blog/industry/${industryId}`);
        setBlogs(result.data.reverse());
    };


    return(
        <div className='industry-page'>
            <SideBar />
            <div className='main-industry'>
            {blogs.length > 0 ? (
            <div className="searched-blogs">
              {blogs.map((blog) => (
                <div key={blog.blogId}>
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-blogs-found">No blogs found.</p>
          )}
                
            </div>
            <Footer/>

        </div>

    );
}

export default IndustryPage;