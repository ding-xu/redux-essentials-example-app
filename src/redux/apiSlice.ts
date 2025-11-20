import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { postType } from './posts'

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/fakeApi',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = []) => ['Post', ...result.map((item: any) => ({ type: 'Post', id: item.id }))],
    }),
    getPost: builder.query({
      query: (postId: string) => `/posts/${postId}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `/posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction },
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((post: postType) => post.id === postId)
            if (post) {
              post.reactions[reaction]++
            }
          }),
        )
        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation, useEditPostMutation, useAddReactionMutation } =
  apiSlice
