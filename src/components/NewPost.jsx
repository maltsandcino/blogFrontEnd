import { useState } from "react";
import axios from "axios";
import './NewPost.css';
import { Navigate } from "react-router-dom";

export default function NewPost({ apiUrl, token, blogId, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = title.trim() && content.trim() && !loading;
  const navigate = Navigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const payload = { title, content, blogId };

      const res = await axios.post(`${apiUrl}/post`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      });


      if (onPostCreated) onPostCreated(res.data);


      // Reset form
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <h3>Create a new post</h3>

      <div className="field">
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="post-content">Content</label>
        <textarea
          id="post-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={!canSubmit}>
        {loading ? "Posting..." : "Add Post"}
      </button>
    </form>
  );
}