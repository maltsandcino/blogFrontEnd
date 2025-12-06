import "./SpecificBlog.css";

import './Blog.css';
import { useContext, useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import BlogView from '../components/BlogView'
import CreateBlogForm from '../components/BlogForm'

export default function SpecificBlog() {

const apiUrl = import.meta.env.VITE_API_BASE;
const {setUserId, setUsername, setToken,userId, userName} = useOutletContext();
const token = localStorage.getItem("token")
const [pageNumber, setPageNumber] = useState(0)
const [blog, setBlog] = useState(null)
const [updated, setUpdated] = useState(false)
const { id } = useParams();

useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog`, {
          headers: { authorization: `Bearer ${token}` },
          params: {blog: id }
        });
        setBlog(response.data); 
      } catch (err) {
        console.error("Error fetching blogs:", err);
        // setToken(null)
      }
    };
    fetchBlog();       

  }, [])

return(<>
<div className="blog-content">
{blog ? (<BlogView apiUrl={apiUrl} blog={blog} token={token} setBlog={setBlog}/>) : (<div className="loading">Loading</div>) }
</div>
</>)

}

