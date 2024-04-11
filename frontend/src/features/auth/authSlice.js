import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// { } threw an error as a default
import authService from './authService'

import { extractErrorMessage } from '../../utils'

let user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  // isError: false,
  // isSuccess: false,
  isLoading: false,
  message: '',
}

export const register = createAsyncThunk(
  'aut/register',
  async (user, thunkAPI) => {
    try {
      console.log(user)
      return await authService.register(user)
    } catch (error) {
      // this is the REJECTED state
      console.log(error)
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const login = createAsyncThunk('aut/login', async (user, thunkAPI) => {
  try {
    console.log(user)
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      //<-- reset initial state
      state.isLoading = false
      state.message = ''
    },
  },
  // we do NOT call reset as we are not using isError / isSuccess / message
  // we will not see any state returned unless we use the reducers first
  // state. pertains to initial state
  // action is us getting the data back
  // state is state NOT pending fullfilled true
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.message = action.payload // <-- delete
        // state.user = null // <-- delete
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })

      // it first clears out from local storage but does not clear STATE
      // so we update the state with this function call
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

// reset is an action
export const { reset } = authSlice.actions //<-- regular reducers

export default authSlice.reducer
