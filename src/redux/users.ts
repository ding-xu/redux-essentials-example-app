import { /*createSlice, createAsyncThunk,*/ createEntityAdapter } from '@reduxjs/toolkit'
// import { client } from '../api/client'
import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

export type userType = {
  id: string
  name: string
}

// const initialState: userType[] = []
const usersAdapter = createEntityAdapter<userType>()
const initialState = usersAdapter.getInitialState()

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       // return action.payload as userType[]
//       usersAdapter.setAll(state, action.payload as userType[])
//     })
//   },
// })

// export const {} = usersSlice.actions

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await client.get('/fakeApi/users')
//   return response.data
// })

// export default usersSlice.reducer

// // export const selectAllUsers = (state: any) => state.users

// // export const selectUserById = (state: any, userId: string) => state.users.find((user: userType) => user.id === userId)

// export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
//   (state: any) => state.users,
// )

export const extentdedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response: any) => {
        return usersAdapter.setAll(initialState, response)
      },
    }),
  }),
})

export const { useGetUsersQuery } = extentdedApiSlice

const selectUsersResult = extentdedApiSlice.endpoints.getUsers.select(undefined)
const selectUsersData = createSelector(selectUsersResult, (usersResult) => usersResult.data)

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state: any) => selectUsersData(state) ?? initialState,
)
