import { useState } from "react";
import axios from "axios";
import "./Post.css";

export default function Post({ post, token, apiUrl }) {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewComments, setViewComments] = useState(false)

  const canSubmit = newComment.trim().length > 0 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const payload = { content: newComment, postId: post.id, title: title };

      const res = await axios.post(`${apiUrl}/comment`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      });

      // Append new comment to local state
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-meta">
        <span>By {post.user?.username || "Anonymous"}</span>
        <span> • {new Date(post.created).toLocaleDateString()}</span>
      </div>

  
      <div className="comments">
        <h4 onClick={() => setViewComments(prev => !prev)}>Click to view comments...</h4>
        {viewComments && (
            <>{comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="comment">
            <div className="comment-meta">
                {c.title && <div className="comment-title">{c.title}</div>}
                <div className="comment-author">{c.user?.username || "Anonymous"}</div>
                <div className="comment-date">
                {c.created ? new Date(c.created).toLocaleDateString() : ""}
                </div>
            </div>

            <div className="comment-content">
                {c.content}
            </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}</>)}
        
      </div>
      
      
 </div>
  );
}
