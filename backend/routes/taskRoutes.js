const express = require('express')
const router = express.Router()
// import { getTasks } from '../controllers/taskController'
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect)

module.exports = router
