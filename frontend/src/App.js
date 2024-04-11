import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import NewBlog from './pages/NewBlog'
import PrivateRoute from './components/PrivateRoute'
import UserBlogs from './pages/UserBlogs'
import UserBlogPage from './pages/UserBlogPage'
import Tasks from './pages/Tasks'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/new-blog"
              element={
                <PrivateRoute>
                  <NewBlog />
                </PrivateRoute>
              }
            />

            <Route
              path="/user-blogs"
              element={
                <PrivateRoute>
                  <UserBlogs />
                </PrivateRoute>
              }
            />

            <Route
              path="/user-blog/:blogID"
              element={
                <PrivateRoute>
                  <UserBlogPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
