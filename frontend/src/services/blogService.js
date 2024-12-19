import api from "../utils/api";
import axios from "axios";

export const getBlogs = async (category = "All") => {
  const params = category && category !== "All" ? { category } : {};
  const { data } = await api.get("/blogs", { params });
  return data;
};
export const getMyBlogs = async () => {
  const response = await api.get("/blogs/myblogs");
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await api.post("/blogs", blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};
export const registerUser = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};
