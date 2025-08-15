import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const {} = usersSlice.actions

export default usersSlice.reducer
