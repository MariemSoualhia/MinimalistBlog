import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import styles from "./BlogDetails.module.css"; // Import CSS Module

const BlogDetails = () => {
  const { id } = useParams();
  const { user, token } = useUser();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await api.get(`/blogs/${id}`);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        `/blogs/${id}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlog(data); // Update blog with new comments
      setCommentText("");
    } catch (error) {
      alert("Failed to add comment.");
    }
  };

  if (!blog) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.page}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>

      <div className={styles.author}>
        <h3>Author Details</h3>
        <p>
          <strong>Username:</strong> {blog.user.username}
        </p>
        <p>
          <strong>Email:</strong> {blog.user.email}
        </p>
      </div>

      <div className={styles.comments}>
        <h3>Comments</h3>
        {blog.comments.map((comment) => (
          <div className={styles.comment} key={comment._id}>
            <strong>{comment.user.username}</strong>: {comment.text}
          </div>
        ))}
      </div>

      {user && (
        <form className={styles.form} onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
