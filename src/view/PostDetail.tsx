import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'
import { selectPostById } from '../redux/posts'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const post = useSelector((state: RootState) => selectPostById(state, postId || ''))

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
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${postId}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
