import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

export type userType = {
  id: string
  name: string
}

const initialState: userType[] = []

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload as userType[]
    })
  },
})

export const {} = usersSlice.actions

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

export default usersSlice.reducer

export const selectAllUsers = (state: any) => state.users

export const selectUserById = (state: any, userId: string) => state.users.find((user: userType) => user.id === userId)
