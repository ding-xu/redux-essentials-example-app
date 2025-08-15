import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const post = useSelector((state: any) => {
    return state.posts.find((post: any) => post.id === postId)
  })

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </article>
      <Link to={`/editPost/${postId}`} className="button">
        Edit Post
      </Link>
    </section>
  )
}
