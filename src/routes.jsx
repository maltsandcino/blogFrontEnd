import App from './App';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Blog from './pages/Blog';
import SpecificBlog from './pages/SpecificBlog'
// import CreateBlog from './pages/CreateBlog';
// import AddPost from './pages/AddPost';
// import EditPost from './pages/EditPost';
// import ViewBlog from './pages/ViewBlog';
// import AllBlogs from './pages/AllBlogs';

// Pages: Home, Sign-Up, Create-Blog, Post-Add, Post-Edit, View-Blog, Public-Blogs

const routes = [
{
path: '/',

element: <App />,
children: [
{ path: '', element: <Home /> },
{ path: 'home', element: <Home /> },
{ path: 'signup', element: <Signup /> },
{ path: 'blog', element: <Blog /> },
{ path: 'blogs/:id', element: <SpecificBlog />}
// { path: 'createblog/:id', element: <CreateBlog /> },
// { path: 'addpost/:id', element: <AddPost />},
// { path: 'editpost/:id', element: <EditPost />},
// { path: 'viewblog/:id', element: <ViewBlog />},
// { path: 'blogs/', element: <AllBlogs />},

],
},
];

export default routes