import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './posts'
import usersReducer from './users'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
})
