import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import State from "pusher-js/types/src/core/http/state"
import PostsApi from "src/apis/posts.api"

export const getNotificationPost = createAsyncThunk(
  "notification/post",
  async (page: number, thunkAPI) => {
    try {
      const response = await PostsApi.getNotification(page)
      if (response.status === 200) {
        return response.data
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const notificationSlice = createSlice({
  name: "notificationPost",
  initialState: {
    dataNotification: [],
    lastPage: 0,
    isSuccess: false,
    isError: false,
    isFetching: false
  },
  reducers: {
    addNotification: (state: any, action) => {
      state.dataNotification = [action.payload, ...state.dataNotification]
      return state
    },
    loadMoreNotification: (state: any, action) => {
      state.dataNotification.push(...action.payload)
      return state
    },
    checkViewed: (state: any, action) => {
      const index: number = state.dataNotification.findIndex(
        (el: any) => el.notificationId === action.payload
      )
      if (state.dataNotification[index].viewed === false) {
        state.dataNotification[index].viewed = true
      }
      return state
    }
  },
  extraReducers: {
    [getNotificationPost.fulfilled.type]: (state, { payload }) => {
      state.dataNotification = payload.notifications
      state.lastPage = payload.last_page

      state.isSuccess = true
      state.isError = false
      state.isFetching = false
      return state
    },
    [getNotificationPost.rejected.type]: (state, { payload }) => {
      state.isSuccess = false
      state.isError = true
      state.isFetching = false
    },
    [getNotificationPost.pending.type]: (state, { payload }) => {
      state.isSuccess = false
      state.isError = false
      state.isFetching = true
    }
  }
})

const { reducer: notificationReducer } = notificationSlice

export const { checkViewed, addNotification, loadMoreNotification } =
  notificationSlice.actions
export default notificationReducer

export const notificationPostSelector = state => state.notificationPost
