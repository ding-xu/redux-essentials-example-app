// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
// import { client } from '../api/client'

// export type notificationType = {
//   id: string
//   message: string
//   date: string
//   user: string
//   read?: boolean
//   isNew?: boolean
// }

// // const initialState: notificationType[] = []
// const notificationsAdapter = createEntityAdapter<notificationType>({
//   sortComparer: (a, b) => b.date.localeCompare(a.date),
// })
// const initialState = notificationsAdapter.getInitialState()

// export const notificationsSlice = createSlice({
//   name: 'notifications',
//   initialState,
//   reducers: {
//     allNotificationsRead(state) {
//       // state.forEach((notification) => {
//       //   notification.read = true
//       // })
//       Object.values(state.entities).forEach((notification) => {
//         notification.read = true
//       })
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchNotifications.fulfilled, (state, action) => {
//       // state.push(...(action.payload as notificationType[]))
//       // state.sort((a, b) => b.date.localeCompare(a.date))
//       // state.forEach((notification) => {
//       //   notification.isNew = !notification.read
//       // })
//       notificationsAdapter.upsertMany(state, action.payload as notificationType[])
//       Object.values(state.entities).forEach((notification) => {
//         notification.isNew = !notification.read
//       })
//     })
//   },
// })

// export default notificationsSlice.reducer

// export const { allNotificationsRead } = notificationsSlice.actions

// export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
//   const allNotifications = selectAllNotifications(getState())
//   const [lastNotification] = allNotifications
//   const since = lastNotification ? lastNotification.date : ''
//   const response = await client.get(`/fakeApi/notifications?since=${since}`)
//   return response.data
// })

// // export const selectAllNotifications = (state: any) => state.notifications

// export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors(
//   (state: any) => state.notifications,
// )

import { createAction, createEntityAdapter, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { forceGenerateNotifications } from '../api/server'
import { apiSlice } from './apiSlice'

export type notificationType = {
  id: string
  message: string
  date: string
  user: string
  read?: boolean
  isNew?: boolean
}

const notificationsReceived = createAction('notifications/notificationsReceived')

export const extentdedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notifications',
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        const ws = new WebSocket('ws://localhost')
        try {
          await cacheDataLoaded
          const listener = (event: MessageEvent) => {
            const message = JSON.parse(event.data)
            if (message.type === 'notifications') {
              //更新缓存
              updateCachedData((draft) => {
                draft.push(...message.payload)
                draft.sort((a: notificationType, b: notificationType) => b.date.localeCompare(a.date))
              })
              //更新state
              dispatch(notificationsReceived(message.payload))
            }
          }
          ws.addEventListener('message', listener)
        } catch {}
        //所有订阅都被移除时关闭websocket连接
        await cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

export const { useGetNotificationsQuery } = extentdedApiSlice

const emptyNotifications: notificationType[] = []

export const selectNotificationsResult = extentdedApiSlice.endpoints.getNotifications.select(undefined)

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data ?? emptyNotifications,
)

export const fetchNotificationsWebsocket = () => (dispatch: any, getState: any) => {
  const allNotifications = selectNotificationsData(getState())
  const [lastNotification] = allNotifications
  const since = lastNotification ? lastNotification.date : ''
  forceGenerateNotifications(since)
}

// ===== slice ======
const notificationsAdapter = createEntityAdapter<notificationType>()
const initialState = notificationsAdapter.getInitialState()

const matchNotificationsReceived = isAnyOf(
  notificationsReceived,
  extentdedApiSlice.endpoints.getNotifications.matchFulfilled,
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchNotificationsReceived, (state, action) => {
      // 添加客户端元数据以跟踪新通知
      const notificationsMetadata = action.payload.map((notification: notificationType) => ({
        id: notification.id,
        read: false,
        isNew: true,
      }))
      Object.values(state.entities).forEach((notification) => {
        // 我们读过的任何通知都不再是新的
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, notificationsMetadata)
    })
  },
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const { selectAll: selectNotificationsMetadata, selectEntities: selectMetadataEntities } =
  notificationsAdapter.getSelectors((state: any) => state.notifications)
