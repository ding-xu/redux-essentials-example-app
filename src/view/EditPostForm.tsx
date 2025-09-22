import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-tiny-toast'
import { RootState } from '../redux/store'
import { selectPostById, updatePost } from '../redux/posts'

export default function EditPostForm() {
  const { postId } = useParams()
  const post = useSelector((state: RootState) => selectPostById(state, postId || ''))

  const [title, setTitle] = useState(post ? post.title : '')
  const [content, setContent] = useState(post ? post.content : '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
  }
  function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (title && content) {
      dispatch(
        updatePost({
          id: postId,
          title,
          content,
        }),
      )
      setTitle('')
      setContent('')
      navigate(`/posts/${postId}`)
    } else {
      toast.show('Please fill in both fields', {
        variant: 'warning',
        position: 'top-center',
      })
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input id="postTitle" name="postTitle" type="text" value={title} onChange={handleTitleChange} />
        <label htmlFor="postContent">Post Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={handleContentChange} />
        <button type="submit" onClick={handleSubmit}>
          Save Post
        </button>
      </form>
    </section>
  )
}
