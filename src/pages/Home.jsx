import { useContext, useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import Post from '../components/Post';

function Home() {

  const apiUrl = import.meta.env.VITE_API_BASE;
  const {setUserId, setUsername, setToken,userId, userName} = useOutletContext();
  const token = localStorage.getItem("token")
  const [pageNumber, setPageNumber] = useState(0)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blogs`, {
          headers: { authorization: `Bearer ${token}` }, 
          params: { page: pageNumber } 
        });
        setBlogs(response.data); 
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, [apiUrl, token, pageNumber]);

  return (
  <>
      <div className="home-content">
        <h2 className="welcome">
        Latest Blogs...
        </h2>          
        <div className="blogHolder">
          {blogs.map((blog) => ( <div key={blog.id}>
    <Link key={blog.title} to={`/blogs/${blog.id}`} viewTransition > <h3 className="blog-title-home">{blog.title}</h3></Link>
    {blog.posts && blog.posts.length > 0 && (
      <Post post={blog.posts[0]} apiUrl={apiUrl} token={token} />
    )}
  </div>
))}
        </div>
      </div>
  
    </>
  )
}

export default Home;