import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

export type notificationType = {
  id: string
  message: string
  date: string
  user: string
  read?: boolean
  isNew?: boolean
}

const initialState: notificationType[] = []

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      state.forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...(action.payload as notificationType[]))
      state.sort((a, b) => b.date.localeCompare(a.date))
      state.forEach((notification) => {
        notification.isNew = !notification.read
      })
    })
  },
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState())
  const [lastNotification] = allNotifications
  const since = lastNotification ? lastNotification.date : ''
  const response = await client.get(`/fakeApi/notifications?since=${since}`)
  return response.data
})

export const selectAllNotifications = (state: any) => state.notifications
