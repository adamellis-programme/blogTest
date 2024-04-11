const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: [true, 'please select a Category'],
    },
    author: {
      type: String,
      required: [true, 'please select a Author'],
    },
    blogTitle: {
      type: String,
      required: [true, 'please enter a blog title'],
    },
    blogBody: {
      type: String,
      required: [true, 'please enter some blog text'],
    },
    featured: {
      type: Boolean,
      // required: [true, 'please enter some blog text'],
    },
    publish: {
      type: Boolean,
      // required: [true, 'please enter some blog text'],
    },

    lastEdited: {
      type: String,
      default: 'not edited',
    },

    status: {
      type: String,
      enum: ['original', 'edited'],
      default: 'original',
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Blog', blogSchema)
