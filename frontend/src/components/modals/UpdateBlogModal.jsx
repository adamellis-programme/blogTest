import { useEffect, useState } from 'react'
import { toggleUpdateModal } from '../../features/blog/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserBlog, updateUserBlog } from '../../features/blog/blogSlice'
function UpdateBlogModal() {
  const dispatch = useDispatch()
  const { showUpdateModal, blog } = useSelector((state) => state.blogs)
  console.log(blog)
  const { blogID } = useParams()

  const [formData, setFormData] = useState({
    blogTitle: '',
    author: '',
    blogBody: '',
  })
  const { blogTitle, author, blogBody } = formData

  useEffect(() => {
    dispatch(getUserBlog(blogID))
  }, [blogID])

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      blogTitle: blog.blogTitle,
      author: blog.author,
      blogBody: blog.blogBody,
    }))
  }, [blog])

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleClose = () => {
    dispatch(toggleUpdateModal(!showUpdateModal))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // dispatch(updateUserBlog([blogID, { ...formData }]))
    // dispatch(updateUserBlog({ id: blogID, data: formData }))
    dispatch(
      updateUserBlog({
        id: blogID,
        data: {
          ...formData,
          status: 'edited',
          lastEdited: new Date().toLocaleString('en-GB'),
        },
      })
    )
    dispatch(toggleUpdateModal(false))
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={handleClose} className="close-modal-btn">
          cancel
        </button>
        <div className="modal-body">
          <form onSubmit={onSubmit}>
            <div className="modal-form-control">
              <label className="update-label" htmlFor="blogTitle">
                Blog Title
              </label>
              <input
                id="blogTitle"
                name="blogTitle"
                type="text"
                className="modal-input"
                placeholder="blog title"
                value={blogTitle}
                onChange={onMutate}
              />
            </div>
            <div className="modal-form-control">
              <label className="update-label" htmlFor="author">
                Blog Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                className="modal-input"
                placeholder="blog author"
                value={author}
                onChange={onMutate}
              />
            </div>
            <div className="modal-form-control">
              <label className="update-label" htmlFor="blogBody">
                Blog Body
              </label>
              <textarea
                id="blogBody"
                name="blogBody"
                className="modal-text-area"
                value={blogBody}
                onChange={onMutate}
              ></textarea>
            </div>

            <div className="modal-form-control update-modal-btn-container">
              <button className="update-modal-btn">update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateBlogModal
