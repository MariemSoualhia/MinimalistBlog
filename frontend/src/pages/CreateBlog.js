import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import styles from "./CreateBlog.module.css"; // Import CSS Module

const CreateBlog = () => {
  const { user, token } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  if (!user) {
    return <p>Please log in to create a blog.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the request to create a blog
      await api.post(
        "/blogs",
        { title, content, category }, // Payload
        { headers: { Authorization: `Bearer ${token}` } } // Token in headers
      );

      // Redirect to home after successful creation
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Create Blog</h1>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateBlog;
