import { useState } from "react";
import axios from "axios";
import './BlogForm.css';


export default function CreateBlogForm({
  setBlog,
  apiUrl,                
  token,                
  onSuccess = () => {}, 
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = title.trim().length > 0 && !loading;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        title,
        description: description || null,
        public: !isPrivate, 
      };

      const res = await axios.post(`${apiUrl}/blog`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setBlog(res.data);
      onSuccess(res.data);

      setTitle("");
      setDescription("");
      setIsPrivate(false);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create blog. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <h2>Create your blog</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="My blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
          required
        />
        <small>{title.length}/255</small>
      </div>

      <div className="field">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          placeholder="What is your blog about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="field checkbox">
        <label htmlFor="private">
          <input
            id="private"
            name="private"
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Make this blog private
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={!canSubmit}>
        {loading ? "Creating..." : "Create blog"}
      </button>
    </form>
  );
}
