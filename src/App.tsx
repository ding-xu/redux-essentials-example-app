import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-tiny-toast'

import { Navbar } from './components/Navbar'
import PostsList from './view/PostsList'
import AddPostForm from './view/AddPostForm'

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
        </Routes>
      </div>
      <ToastContainer></ToastContainer>
    </Router>
  )
}

export default App
