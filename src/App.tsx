import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import PostsList from './view/PostsList'

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
              </React.Fragment>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
