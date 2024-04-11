import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserBlogs } from '../features/blog/blogSlice'
import BlogItem from '../components/BlogItem'
import { Link } from 'react-router-dom'

function UserBlogs() {
  const { blogs } = useSelector((state) => state.blogs)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { name } = user
  useEffect(() => {
    dispatch(getUserBlogs())
  }, [dispatch])

  return (
    <div className="page-container">
      <section className="user-blogs-heading">
        <h1>{name}'s Blogs</h1>
        <p>view and edit all your blogs in one place</p>
      </section>
      {/* make a search bar here todo responsive search bar*/}
      <section className="blogs-table-section">
        <div className="blogs-header">
          <div>date</div>
          <div>last edited</div>
          <div>country</div>
          <div>blog title</div>
          <div>status</div>
        </div>
        {blogs && blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)}
      </section>
    </div>
  )
}

export default UserBlogs
