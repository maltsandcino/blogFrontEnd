import './Blog.css';
import { useContext, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import BlogView from '../components/BlogView'
import CreateBlogForm from '../components/BlogForm'

function Blog() {

const apiUrl = import.meta.env.VITE_API_BASE;
const {setUserId, setUsername, setToken,userId, userName} = useOutletContext();
const token = localStorage.getItem("token")
const [pageNumber, setPageNumber] = useState(0)
const [blog, setBlog] = useState(null)
const [updated, setUpdated] = useState(false)


useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog`, {
          headers: { authorization: `Bearer ${token}` }
        });
        setBlog(response.data); 
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlog();       

  }, [apiUrl, token, updated])

return(<>
<div className="blog-content">
{blog ? (<BlogView apiUrl={apiUrl} blog={blog} token={token} setBlog={setBlog}/>) : (<CreateBlogForm setBlog={setBlog} apiUrl={apiUrl} token={token} />) }
</div>
</>)

}

export default Blog;