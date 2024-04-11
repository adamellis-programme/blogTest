import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../utils'
import blogService from './blogService'

const initialState = {
  blogs: [],
  blog: {},
  loading: false,
  // blogs: null,
  // blog: null,
  message: '',
  showUpdateModal: false,
  showDeleteModal: false,
  deleteCode: '',
}

export const createBlog = createAsyncThunk('blog/create', async (blogData, thunkAPI) => {
  try {
    console.log(blogData)
    const token = thunkAPI.getState().auth.user.token
    return await blogService.createBlog(blogData, token)
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const getUserBlogs = createAsyncThunk('blog/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await blogService.getUserBlogs(token)
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const getUserBlog = createAsyncThunk('blog/userBlog', async (blogID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await blogService.getUserBlog(blogID, token)
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const updateUserBlog = createAsyncThunk(
  'blog/update',
  async (idAndData, thunkAPI) => {
    const { id, data } = idAndData
    console.log(data)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await blogService.updateUserBlog(id, token, data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const deleteBlogPost = createAsyncThunk('delete/blog', async (id, thunkAPI) => {
  console.log(id)

  try {
    const tokenForDbAccess = thunkAPI.getState().auth.user.token
    return await blogService.deleteBlogPost(id, tokenForDbAccess) // Passing formData to the service
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    reset: (state) => initialState, // ??
    toggleUpdateModal: (state, action) => {
      state.showUpdateModal = action.payload
    },

    toggleDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload
    },

    setDeleteCode: (state, action) => {
      state.deleteCode = action.payload
    },
  },

  // for async data
  extraReducers: (builder) => {
    builder
      .addCase(getUserBlogs.pending, (state) => {
        state.blogs = null
      })
      .addCase(getUserBlogs.fulfilled, (state, action) => {
        console.log(action.payload)
        state.blogs = action.payload
      })
      // .addCase(getUserBlogs.rejected, (state, action) => {
      //   state.message = action.payload
      // })

      .addCase(getUserBlog.fulfilled, (state, action) => {
        state.blog = action.payload
      })
      .addCase(updateUserBlog.fulfilled, (state, action) => {
        state.blog = action.payload
        // map for the list
      })
  },
})

export const { toggleUpdateModal, toggleDeleteModal, setDeleteCode } = blogSlice.actions
export default blogSlice.reducer
