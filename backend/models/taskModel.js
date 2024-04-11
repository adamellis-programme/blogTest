const mongoose = require('mongoose')

// object of fields
const taskModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    taskText: {
      type: String,
      required: [true, 'please enter a task'],
    },
    taskDate: {
      type: String,
    },
    edited: {
      type: Boolean,
    },
    completed: {
      // <-- status
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskModel)
