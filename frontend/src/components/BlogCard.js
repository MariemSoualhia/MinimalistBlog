import React from "react";
import { Link } from "react-router-dom";
import styles from "./BlogCard.module.css";

const BlogCard = ({ blog }) => {
  return (
    <div className={styles.card}>
      <h2>{blog.title}</h2>
      <p>{blog.content.slice(0, 100)}...</p>
      <Link to={`/blogs/${blog._id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;
