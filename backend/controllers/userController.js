const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
// @desc Register a new user
// @route api/users
// @ access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // find if user allready exist
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400) // <-- client error
    throw new Error('User already exists from server')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    test: password,
  })

  console.log('==> brand new registerd:', user)

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      test: password,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Login a user
// @route api/users/login
// @ access public
// prettier-ignore
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  const user = await User.findOne({ email })                 

  if (user && (await bcrypt.compare(password, user.password))) { 
    

    res.status(200).json({                                       
      test: 'this is sent to the client from the backend in the res.json',
      id: user._id,                                             
      name: user.name,
      email: user.email,
      token: generateToken(user._id),         
    })                                        
  } else {                                    
    res.status(401)                           
    throw new Error('Invalid credentials')    
  }
  // res.send('Login Route ..')
})

// @desc get current user
// @route api/me
// @ access private
const getMe = asyncHandler(async (req, res) => {
  console.log('=>', req.user)

  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }

  res.status(200).json(user)
  // res.status(200).json(req.user)
})

// prettier-ignore
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {    
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
