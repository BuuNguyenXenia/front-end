import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useHistory } from "react-router-dom"
import PostsApi from "src/apis/posts.api"
import { PATH } from "src/constants/path"
import LocalStorageService from "src/services/LocalStorageService/Storage.service"

export const itemPostThunk = createAsyncThunk(
  "item/post",
  async (_id: string, thunkAPI) => {
    try {
      const response = await PostsApi.getItemPosts(_id)

      if (response.status === 200) {
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (err) {
      const history = useHistory()

      history.push(PATH.NOT_FOUND)
      throw err
    }
  }
)

interface Comment {
  _id: string
  body: string
}

export const createCommentPost = createAsyncThunk(
  "post/comment",
  async (comment: Comment, thunkAPI) => {
    try {
      const _id = comment._id
      const body = {
        body: comment.body
      }
      const response = await PostsApi.createComment(_id, body)
      const data = await response.data
      if (response.status === 200) {
        LocalStorageService.setItem("itemPost", _id)
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      throw err
    }
  }
)

export const createLikePost = createAsyncThunk(
  "post/like",
  async (_id: string, thunkAPI) => {
    try {
      const response = await PostsApi.createLike(_id)
      if (response.status === 200) {
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (err) {
      throw err
    }
  }
)

const postsSlice = createSlice({
  name: "itemPost",
  initialState: {
    dataPost: {},
    isSuccess: false,
    isError: false,
    isFetching: false
  },
  reducers: {
    clearState: state => {
      state.isError = false
      state.isSuccess = false

      return state
    },
    toggleLike: (state: any, action) => {
      let index = state.dataPost.likes.data.indexOf(action.payload)

      if (index !== -1) {
        state.dataPost.likes.data.splice(index, 1)
        state.dataPost.likes.counts--
      } else {
        state.dataPost.likes.data.push(action.payload)
        state.dataPost.likes.counts++
      }
      return state
    },
    addComment: (state: any, action) => {
      state.dataPost.comments.data.push(action.payload)
      return state
    }
  },
  extraReducers: {
    [itemPostThunk.fulfilled.type]: (state, { payload }) => {
      state.dataPost = payload

      state.isSuccess = true
      state.isError = false
      state.isFetching = false

      return state
    },
    [itemPostThunk.rejected.type]: state => {
      state.isError = true
      state.isSuccess = false
      state.isFetching = false
      return state
    },
    [itemPostThunk.pending.type]: state => {
      state.isSuccess = false
      state.isError = false
      state.isFetching = true
      return state
    },
    [createCommentPost.fulfilled.type]: (state, { payload }) => {
      state.dataPost = payload
      return state
    },
    [createCommentPost.rejected.type]: state => {
      return state
    }
  }
})

const { reducer: itemPostReducer } = postsSlice

export default itemPostReducer

export const { clearState, toggleLike, addComment } = postsSlice.actions
export const itemPostSelector = state => state.itemPost
