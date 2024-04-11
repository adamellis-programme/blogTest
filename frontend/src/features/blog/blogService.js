import axios from 'axios'
const API_URL = '/api/blogs/'

const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log(blogData)
  const response = await axios.post(API_URL, blogData, config)
  return response.data
}

const getUserBlogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  console.log(response)
  return response.data
}

const getUserBlog = async (blogID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + blogID, config)
  console.log(response)
  return response.data
}

const updateUserBlog = async (blogID, token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + blogID, data, config)
  console.log(response)
  return response.data
}

const deleteBlogPost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  //  making the request
  const response = await axios.delete(API_URL + id, config)

  // console.log(response.data);
  return response.data
}

const blogService = {
  createBlog,
  getUserBlogs,
  getUserBlog,
  updateUserBlog,
  deleteBlogPost,
}

export default blogService
