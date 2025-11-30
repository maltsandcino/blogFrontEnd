import './BlogForm.css';
import NewPost from './NewPost';
import Post from './Post';


export default function BlogView({ blog, apiUrl,                
  token, setBlog
}){

    return(<>
    <h2>{blog.title}</h2>
    <div className='blogDescription'>
        - {blog.description} -
    </div>
    <br></br>
    <div className='by-line'>Blog by {blog.owner.username}</div>
    <div className='new-entry'>
        <NewPost apiUrl={apiUrl} token={token} blogId={blog.id}   onPostCreated={(newPost) => {
    setBlog({ ...blog, posts: [newPost, ...blog.posts] });
  }}/>
    </div>
    <div className="posts">
        {blog.posts && blog.posts.length > 0 ? (
          blog.posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              token={token}
              apiUrl={apiUrl}
            />
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </>

    )

}

