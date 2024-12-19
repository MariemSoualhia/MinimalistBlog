import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import Modal from "react-modal"; // Import React Modal
import styles from "./MyBlogs.module.css";

Modal.setAppElement("#root"); // Set root element for accessibility

const MyBlogs = () => {
  const { user, token } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await api.get("/blogs/myblogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(data);
      } catch (error) {
        console.log("Error fetching your blogs.");
      }
    };
    fetchMyBlogs();
  }, [token]);

  const handleDelete = async (blogId) => {
    try {
      await api.delete(`/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      alert("Error deleting the blog.");
    }
  };

  const openEditModal = (blog) => {
    setCurrentBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/blogs/${currentBlog._id}`,
        { title, content, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs(blogs.map((blog) => (blog._id === data._id ? data : blog))); // Update the blog in the list
      closeEditModal();
    } catch (error) {
      alert("Error updating the blog.");
    }
  };

  if (!user) return <p>Please log in to view your blogs.</p>;

  return (
    <div className={styles.container}>
      <h1>My Blogs</h1>
      {blogs.length > 0 ? (
        <ul className={styles.blogList}>
          {blogs.map((blog) => (
            <li key={blog._id} className={styles.blogItem}>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className={styles.actions}>
                <button onClick={() => openEditModal(blog)}>Edit</button>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs found. Start creating one!</p>
      )}

      {/* Modal for editing a blog */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeEditModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Edit Blog</h2>
        <form onSubmit={handleEditSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button type="submit">Save</button>
            <button type="button" onClick={closeEditModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyBlogs;
