import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    deletePost: (state, action) => {
      const { id } = action.payload
      state = state.filter((post) => post.id !== id)
    },
  },
})

export const { addPost, updatePost, deletePost } = postsSlice.actions

export default postsSlice.reducer
