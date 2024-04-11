import React from 'react'
import logo from '../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  const handleLogout = () => {
    console.log('object')
    dispatch(logout())
    navigate('/')
  }
  return (
    <header>
      <nav className="nav">
        <div className="nav-center">
          <div className="nav-header">
            <button className="toggle-nav">
              <i className="fa-solid fa-bars"></i>
            </button>
            <Link to="/">
              <img src={logo} alt="" className="nav-logo" />
            </Link>
          </div>
          {/* TO DO welcocome user div */}
          <div className="top-nav-links-container">
            <ul className="top-nav-links">
              {user ? (
                <>
                  <button onClick={handleLogout} className="sign-out-btn">
                    signout
                  </button>
                  <Link to="/user-blogs" className="top-nav-link">
                    my blogs
                  </Link>
                  <Link to="/tasks" className="top-nav-link">
                    tasks
                  </Link>
                  <Link to="/new-blog" className="top-nav-link new-blog-link">
                    new blog
                  </Link>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register" className="top-nav-link">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign-in" className="top-nav-link">
                      Login
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/" className="top-nav-link">
                  home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

window.addEventListener('resize', () => {
  console.log(window.innerWidth)
})

export default Header
