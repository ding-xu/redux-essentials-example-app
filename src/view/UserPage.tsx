import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'
import { selectUserById } from '../redux/users'
import { /*selectAllPosts,*/ selectPostsByUser } from '../redux/posts'

export default function UserPage() {
  const { userId } = useParams<{ userId: string }>()
  const user = useSelector((state: RootState) => selectUserById(state, userId || ''))
  // const postsForUser = useSelector((state: RootState) => {
  //   const allPosts = selectAllPosts(state)
  //   return allPosts.filter((post) => post.user === userId)
  // })
  const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, userId))

  const renderedPosts = postsForUser.map((post) => (
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
