import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

export type reactionsType = {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}
export type postType = {
  id: string
  title: string
  content: string
  date: string
  user: string
  reactions?: reactionsType
}
export type postsStateType = {
  posts: postType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: postsStateType = {
  posts: [],
  status: 'idle',
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, tada: 0, heart: 0, rocket: 0, eyes: 0 },
          },
          meta: {
            timestamp: new Date().getTime(),
          },
          error: false,
        }
      },
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    deletePost: (state, action) => {
      const { id } = action.payload
      state.posts = state.posts.filter((post) => post.id !== id)
    },
    updateReaction: (state, action) => {
      const { postId, reaction }: { postId: string; reaction: keyof reactionsType } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        if (!existingPost.reactions) {
          existingPost.reactions = {
            thumbsUp: 0,
            tada: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          }
        }
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    // Handle the fetchPosts thunk
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload as postType[]
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
    // Handle the addPostWithServer thunk
    builder.addCase(addPostWithServer.fulfilled, (state, action) => {
      state.posts.push(action.payload as postType)
    })
  },
})

export const { addPost, updatePost, deletePost, updateReaction } = postsSlice.actions

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addPostWithServer = createAsyncThunk(
  'posts/addPostWithServer',
  async (initialState: { title: string; content: string; user: string }) => {
    const response = await client.post('/fakeApi/posts', initialState)
    return response.data
  },
)

export default postsSlice.reducer

export const selectAllPosts = (state: any) => state.posts.posts

export const selectPostById = (state: any, postId: string) =>
  state.posts.posts.find((post: postType) => post.id === postId)
