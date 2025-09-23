// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { RootState, AppDispatch } from '../redux/store'
// import { postType, fetchPosts, /*selectAllPosts,*/ selectPostById, selectPostIds } from '../redux/posts'
// import { Spinner } from '../components/Spinner'
// import PostAuthor from './PostAuthor'
// import TimeAgo from './TimeAgo'
// import ReactionButtons from './ReactionButtons'

// function PostExcerpt(/*{ post }: { post: postType }*/ { id }: { id: string }) {
//   const post: postType = useSelector((state: RootState) => selectPostById(state, id))
//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>{post.title}</h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//       <ReactionButtons post={post} />
//       <Link to={`/posts/${post.id}`} className="button muted-button">
//         view post
//       </Link>
//     </article>
//   )
// }

// export default function PostsList() {
//   const dispatch = useDispatch<AppDispatch>()
//   // const posts = useSelector(selectAllPosts)
//   const orderedPostIds = useSelector(selectPostIds)
//   const postStatus = useSelector((state: RootState) => state.posts.status)
//   const error = useSelector((state: RootState) => state.posts.error)

//   useEffect(() => {
//     if (postStatus === 'idle') {
//       dispatch(fetchPosts())
//     }
//   }, [postStatus, dispatch])

//   let content
//   if (postStatus === 'loading') {
//     content = <Spinner text="Loading..." />
//   } else if (postStatus === 'succeeded') {
//     // const orderedPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date))
//     // content = orderedPosts.map((post: any) => <PostExcerpt key={post.id} post={post} />)
//     content = orderedPostIds.map((postId: string) => <PostExcerpt key={postId} id={postId} />)
//   } else if (postStatus === 'failed') {
//     content = <div>{error}</div>
//   }

//   return (
//     <section className="posts-list">
//       <h2>Posts</h2>
//       {content}
//     </section>
//   )
// }

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { postType } from '../redux/posts'
import { useGetPostsQuery } from '../redux/apiSlice'
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
  const { data: posts = [], isLoading, isSuccess, isError, error } = useGetPostsQuery(undefined)
  const sortedPosts = useMemo(() => {
    return posts.slice().sort((a: postType, b: postType) => b.date.localeCompare(a.date))
  }, [posts])

  let content
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = sortedPosts.map((post: postType) => <PostExcerpt key={post.id} post={post} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
