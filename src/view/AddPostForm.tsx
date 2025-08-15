import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'
import { toast } from 'react-tiny-toast'
import { addPost } from '../redux/posts'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()

  const users = useSelector((state: any) => state.users)
  const userOptions = users.map((user: any) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
  }
  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(e.target.value)
  }
  function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (title && content && userId) {
      // dispatch(
      //   addPost({
      //     id: nanoid(),
      //     title,
      //     content,
      //   }),
      // )
      dispatch(addPost(title, content, userId))
      setTitle('')
      setContent('')
      setUserId('')
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
        <label htmlFor="postUser">User:</label>
        <select id="postUser" name="postUser" value={userId} onChange={handleUserChange}>
          <option value="">Select a user</option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={handleContentChange} />
        <button type="submit" onClick={handleSubmit}>
          Save Post
        </button>
      </form>
    </section>
  )
}
