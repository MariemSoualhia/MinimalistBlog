import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import BlogCard from "../components/BlogCard";
import styles from "./Home.module.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Blogs</h1>
      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
