import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import styles from "./BlogDetails.module.css";

const BlogDetails = () => {
  const { id } = useParams();
  const { user, token } = useUser();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);

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
      setBlog(data);
      setCommentText("");
    } catch (error) {
      alert("Failed to add comment.");
    }
  };

  const handleEditComment = async (commentId, text) => {
    try {
      const { data } = await api.put(
        `/blogs/${id}/comments/${commentId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlog(data);
      setEditingComment(null);
    } catch (error) {
      alert("Failed to update comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await api.delete(`/blogs/${id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlog(data);
    } catch (error) {
      alert("Failed to delete comment.");
    }
  };

  if (!blog) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.page}>
      <h1>{blog.title}</h1>
      <div className={styles.author}>
        <p>
          <strong>Author:</strong> {blog.user?.username || "Unknown"}
        </p>
        <p>
          <strong>Email:</strong> {blog.user?.email || "N/A"}
        </p>
      </div>
      <p>{blog.content}</p>
      <div className={styles.comments}>
        <h3>Comments</h3>
        {blog.comments.map((comment) => (
          <div className={styles.comment} key={comment._id}>
            {editingComment === comment._id ? (
              <>
                <textarea
                  defaultValue={comment.text}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  onClick={() => handleEditComment(comment._id, commentText)}
                >
                  Save
                </button>
                <button onClick={() => setEditingComment(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>
                  <strong>{comment.user.username}</strong>: {comment.text}
                </p>
                {user && comment.user._id === user._id && (
                  <div>
                    <button onClick={() => setEditingComment(comment._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
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
