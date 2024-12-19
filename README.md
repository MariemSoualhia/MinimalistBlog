# MinimalistBlog

Welcome to **MinimalistBlog** – a MERN (MongoDB, Express, React, Node.js) application designed for users to create, manage, and explore blogs. Users can update their profile, add profile pictures, and interact with blogs through comments.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)

---

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Create Blogs**: Users can create blogs with a title, content, and predefined categories.
- **Edit & Delete Blogs**: Users can edit or delete their blogs.
- **Profile Management**: Update username, email, and profile picture.
- **Comments**: Users can comment on blogs and manage their own comments (edit/delete).
- **Filter Blogs by Category**: Blogs can be filtered by predefined categories.

---

## Screenshots

---

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Axios, React Router, CSS Modules
- **Authentication**: JSON Web Token (JWT)
- **File Upload**: Multer for profile picture uploads

---

## Installation

### Prerequisites

- **Node.js** (version 14.x or higher)
- **MongoDB** (installed locally or via a cloud service like Atlas)
- **npm** or **yarn**

### Installation Steps

1. **Clone the project**:

   ```bash
   git clone https://github.com/MariemSoualhia/MinimalistBlog-MERN-Project.git
   cd MinimalistBlog

   ```

2. Install backend dependencies::

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd ../frontend
   npm install

   ```

### Configuration

Create a .env file in the backend directory and add the required configurations: :

```
# .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/minimalistblog
JWT_SECRET=your_jwt_secret
UPLOADS_DIR=uploads
```

### Usage

1. Start the backend :
   ```
   cd backend
   npm start
   ```
2. Start the frontend :
   ```
   cd ../frontend
   npm start
   ```

### Project-Structure

The project structure is as follows: :

```
MinimalistBlog/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   ├── package.json
│   └── public/
│
└── README.md
```
