import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { toast } from 'react-tiny-toast'
import { addPost } from '../redux/posts'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

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
        addPost({
          id: nanoid(),
          title,
          content,
        }),
      )
      setTitle('')
      setContent('')
    } else {
      toast.show('Please fill in both fields', {
        variant: 'warning',
        position: 'top-center',
      })
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
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
