import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Navbar.module.css"; // Import CSS Module

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className={styles.navbar}>
      <h1>MinimalistBlog</h1>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/create">Create Blog</Link>
            </li>
            <li>
              <Link to="/myblogs">My Blogs</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
