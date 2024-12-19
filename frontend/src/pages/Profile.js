import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, token, login } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture || ""
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const profilePictureURL = profilePicture.startsWith("/uploads/")
    ? `http://localhost:5000/static-images/${profilePicture.split("/").pop()}`
    : profilePicture;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        "/users/profile",
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(data, token); // Update user context
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  const handlePictureUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const { data } = await api.post("/users/profile/picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfilePicture(data.profilePicture);
      alert("Profile picture updated successfully!");
    } catch (error) {
      alert("Error updating profile picture.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>
      <div className={styles.profileSection}>
        <img
          src={`http://localhost:5000/static-images/${profilePicture}`}
          alt="Profile"
          className={styles.profilePicture}
        />

        <form onSubmit={handlePictureUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button type="submit">Upload Picture</button>
        </form>
      </div>
      <form className={styles.form} onSubmit={handleProfileUpdate}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
