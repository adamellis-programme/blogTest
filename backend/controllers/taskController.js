// CRUN FUNCTIONALITY
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const Task = require('../models/taskModel')

// @desc    Get user tasks
// @route   GET/blogs/tasks
// @access  private
const getTasks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tasks = await Task.find({ user: req.user.id }) // <-- getting the users records by the JWT see line 12 -- find by the user

  console.log(tasks)
  res.status(200).json(tasks)
})

module.exports = {
  getTasks,
}
