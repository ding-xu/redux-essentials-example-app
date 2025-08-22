import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-tiny-toast'

import { Navbar } from './components/Navbar'
import PostsList from './view/PostsList'
import AddPostForm from './view/AddPostForm'
import PostDetail from './view/PostDetail'
import EditPostForm from './view/EditPostForm'
import UserList from './view/UserList'
import UserPage from './view/UserPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <PostsList />
                <AddPostForm />
              </React.Fragment>
            }
          ></Route>
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </div>
      <ToastContainer></ToastContainer>
    </Router>
  )
}

export default App
