import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toggleDeleteModal, deleteBlogPost } from '../../features/blog/blogSlice'

function DeleteBlogModal() {
  const [isDisabled, setisDisabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blogID } = useParams()
  console.log(blogID)

  const { showDeleteModal, deleteCode } = useSelector((state) => state.blogs)
  const handleClose = () => {
    dispatch(toggleDeleteModal(!showDeleteModal))
  }

  const handleDeleteCode = (e) => {
    console.log(e.target.value)
    if (e.target.value === deleteCode) {
      setisDisabled(false)
    } else {
      setisDisabled(true)
    }
    console.log(isDisabled)
  }

  const handleDelete = () => {
    console.log('deleted')
    dispatch(deleteBlogPost(blogID))
    dispatch(toggleDeleteModal(!showDeleteModal))
    navigate('/user-blogs')
  }

  return (
    <div className="delete-modal">
      <div className="delete-modal-inner-div">
        <div className="delete-modal-body">
          <i className="fa-regular stop-sign fa-hand"></i>
          <p>stop</p>
          <p> you are about to delete this blog article</p>
          <p>are you sure you wish to continue?</p>
        </div>

        <div className="delete-modal-input-container">
          <input
            className="delete-modal-input"
            type="text"
            placeholder="enter delete code"
            onChange={handleDeleteCode}
          />
        </div>

        <div className="delete-modal-btn-container">
          <button
            onClick={handleDelete}
            className={`delete-modal-btn ${isDisabled && 'delte-btn-disabled '}`}
            disabled={isDisabled}
          >
            delete
          </button>
          <button
            onClick={handleClose}
            className=" delete-modal-btn close-delete-modal-btn"
          >
            close
          </button>
        </div>
        <div className="delete-code-div">
          <p>
            <span>{deleteCode}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeleteBlogModal
