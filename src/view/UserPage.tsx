import { useMemo } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { RootState } from '../redux/store'
import { selectUserById } from '../redux/users'
import { /*selectAllPosts, selectPostsByUser*/ postType } from '../redux/posts'
import { useGetPostsQuery } from '../redux/apiSlice'

export default function UserPage() {
  const { userId } = useParams<{ userId: string }>()
  const user = useSelector((state: RootState) => selectUserById(state, userId || ''))
  // const postsForUser = useSelector((state: RootState) => {
  //   const allPosts = selectAllPosts(state)
  //   return allPosts.filter((post) => post.user === userId)
  // })
  // const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, userId))

  const selectPostsForUser = useMemo(() => {
    return createSelector(
      (res) => res.data,
      (_, userId) => userId,
      (posts, userId) => posts?.filter((post: postType) => post.user === userId) ?? [],
    )
  }, [])
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (res) => ({
      ...res,
      postsForUser: selectPostsForUser(res, userId),
    }),
  })

  const renderedPosts = postsForUser.map((post: postType) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{renderedPosts.length > 0 ? renderedPosts : <li>No posts found for this user.</li>}</ul>
    </section>
  )
}
