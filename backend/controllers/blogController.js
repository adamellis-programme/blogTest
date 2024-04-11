const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const BlogModel = require('../models/blogModel')
const blogModel = require('../models/blogModel')

// @desc get ALL user blogs
// @route GET api/blogs
// @ access private
const getBlogs = asyncHandler(async (req, res) => {
  const userID = req.user.id
  console.log(User)
  const user = await User.findById(userID)
  console.log(user)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found!')
  }

  const blogs = await BlogModel.find({ userID: userID })
  console.log('blogs ====>>>>>>', blogs)
  res.status(200).json(blogs)
})

// // @desc create new blog
// // @route POST api/blogs
// // @ access private
const createBlog = asyncHandler(async (req, res) => {
  console.log('req.body ===>', req.body)
  // structured
  const {
    author,
    blogTitle,
    blogBody,
    edited,
    category,
    publish,
    featured,
    status,
    lastEdited,
  } = req.body

  if (!author || !blogTitle || !blogBody || !category) {
    res.status(400)
    throw new Error('Please add a author, title and body ..... from blog controller')
  }

  const userID = req.user.id
  const user = User.findById(userID)

  if (!user) {
    res.status(401)
    throw new Error('No user found form blog controller')
  }

  const blog = await blogModel.create({
    author,
    userID, // <-- from the JWT SIGNED TOKEN DECODED IN AUTH AND ASSIGNED TO REQ.USER
    blogTitle,
    blogBody,
    category,
    featured,
    publish,
    status,
    lastEdited,
  })

  res.status(201).json(blog)
})

// @desc get  user blog
// @route GET api/blogs/:id
// @ access private
const getBlog = asyncHandler(async (req, res) => {
  const userID = req.user.id
  const user = await User.findById(userID)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found!')
  }

  const blog = await BlogModel.findById(req.params.id)
  console.log(blog)

  if (!blog) {
    res.status(404)
    throw new Error('No Blog Article Found')
  }

  // limit blog article to that user
  console.log('blog userId ====> ', blog.userID)
  if (blog.userID.toString() !== userID) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(blog)
})

// @desc DELETE  user blog
// @route DELETE api/blogs/:id
// @ access private
const deleteBlog = asyncHandler(async (req, res) => {
  const userID = req.user.id
  const user = await User.findById(userID)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found!')
  }

  const blog = await BlogModel.findById(req.params.id)
  console.log(blog)

  if (!blog) {
    res.status(404)
    throw new Error('No Blog Article Found')
  }

  // limit blog article to that user
  console.log('blog userId ====> ', blog.userID)
  if (blog.userID.toString() !== userID) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await blog.deleteOne()

  res.status(200).json({ success: true })
})

// @desc update  user blog
// @route PUT api/blogs/:id
// @ access private
const updateBlog = asyncHandler(async (req, res) => {
  const userID = req.user.id
  const user = await User.findById(userID)

  if (!user) {
    res.status(401)
    throw new Error('User Not Found!')
  }

  const blog = await BlogModel.findById(req.params.id)
  console.log(blog)

  if (!blog) {
    res.status(404)
    throw new Error('No Blog Article Found')
  }

  // limit blog article to that user
  console.log('blog userId ====> ', blog.userID)
  if (blog.userID.toString() !== userID) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedBlog)
})

module.exports = {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
}
