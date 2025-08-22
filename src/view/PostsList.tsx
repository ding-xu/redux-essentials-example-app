import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../redux/store'
import { postType, selectAllPosts, fetchPosts } from '../redux/posts'
import { Spinner } from '../components/Spinner'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

function PostExcerpt({ post }: { post: postType }) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        view post
      </Link>
    </article>
  )
}

export default function PostsList() {
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector((state: any) => state.posts.status)
  const error = useSelector((state: any) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post: any) => <PostExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
