import axios from 'axios';

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
});

// List
export const getList = () => {
  return api.get('school/student/')
}

// Post 
export const createPost = (formData) => {
  return api.post('school/student/', formData)
}

// Delete post
export const deletePost = (id) => {
  return api.delete(`school/student/${id}/`)
}

// Put post
export const putPost = (id, formData) => {
  return api.put(`school/student/${id}/`, formData)
}
