const dotenv = require('dotenv').config()
const colors = require('colors')
const express = require('express')
const PORT = process.env.PORT || 6001
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleWare')

// conect to db using mongoos
connectDB()
//  initialises the app variable
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// // rest
// app.get('/', (req, res) => {
//   res.json({ msg: 'hello' })
// })

// connec address to that file    --    /api/users is the root api

// needs req, res
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/blogs', require('./routes/blogRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))

// --> for blogs ONLY:->)

app.use(errorHandler)

app.listen(PORT, () => console.log('server started on port ', PORT))
