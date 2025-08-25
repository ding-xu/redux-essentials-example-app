import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './posts'
import usersReducer from './users'
import notificationsReducer from './notifications'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch