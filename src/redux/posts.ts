import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

type reactionsType = {
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
}

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
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
    updateReaction: (state, action) => {
      const { postId, reaction }: { postId: string; reaction: keyof reactionsType } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        if (!existingPost.reactions) {
          existingPost.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          }
        }
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { addPost, updatePost, deletePost, updateReaction } = postsSlice.actions

export default postsSlice.reducer
