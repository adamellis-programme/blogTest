import { Link } from 'react-router-dom'

function BlogItem({ blog }) {
  const { images } = blog

  // console.log(blog)
  return (
    <Link className="blog-row-link" to={`/user-blog/${blog._id}`}>
      <div className="blog-row-card">
        
        <img className="blog-row-card-img" src={images[0]} alt="" />

        <div className="blog-item-info-container">
          <div className="blog-item-sub-header">date</div>
          <div> {new Date(blog.createdAt).toLocaleString('en-GB')}</div>
        </div>
        <div className="blog-item-info-container">
          <div className="blog-item-sub-header">last edited</div>
          <div> {blog.lastEdited}</div>
        </div>
        <div className="blog-item-info-container">
          <div className="blog-item-sub-header">country</div>
          <div>{blog.category}</div>
        </div>
        <div className="blog-item-info-container">
          <div className="blog-item-sub-header">blog title</div>
          <div className="blog-item-info-container">{blog.blogTitle}</div>
        </div>
        <div className="blog-status-div">
          <span className={`status status-${blog.status}`}>{blog.status}</span>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem
