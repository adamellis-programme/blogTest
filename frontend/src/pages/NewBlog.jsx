import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import MiddelCollumnAdvert from '../components/advert components/MiddelCollumnAdvert'
import { createBlog, updateUserBlog } from '../features/blog/blogSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
function NewBlog() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    author: '',
    blogTitle: '',
    category: '',
    blogBody: '',
    featured: false,
    publish: false,
    status: '',
  })
  const { user } = useSelector((state) => state.auth)
  const { name } = user
  const { author, blogTitle, category, blogBody, featured, publish } = formData
  const url = 'https://api.cloudinary.com/v1_1/travel-adam/image/upload'

  const onChange = (e) => {
    const { name, type, checked, id, placeholder } = e.target // Destructure event target properties

    // console.log(e.target.placeholder)
    // Update state based on checkbox type
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : e.target.value, // Set value for checkboxes based on checked state, otherwise use regular value
    }))
  }
  const onSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const blogData = {
      author,
      blogTitle,
      category,
      blogBody,
      featured,
      publish,
    }

    console.log(blogData)
    dispatch(createBlog(blogData))
      .unwrap()
      .then((data) => {
        toast.success('success blog created')
        const files = document.querySelector('[type=file]').files

        // Function to handle image upload (separate promise chain)
        const uploadImages = async () => {
          const imageUrls = []
          for (let i = 0; i < files.length; i++) {
            let file = files[i]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'react-test') // ?

            const response = await fetch(url, {
              method: 'POST',
              body: formData,
            })
            const responseText = await response.text()
            console.log(responseText)
            const imageUrl = JSON.parse(responseText).secure_url
            imageUrls.push(imageUrl)
          }
          return imageUrls
        }

        return uploadImages().then((imageUrls) => {
          const updatedData = { ...data, images: imageUrls }
          console.log(updatedData) // Log updated data with imageUrls
          return updatedData
        })
      })
      .then((data) => {
        const id = data._id
        dispatch(updateUserBlog({ id, data }))
        setLoading(false)
      })
      .catch(toast.error)
  }

  const handleClearForm = () => {
    setFormData({
      author: '',
      blogTitle: '',
      category: '',
      blogBody: '',
      featured: false,
      publish: false,
    })
  }
  return (
    <div className="page-container">
      {loading && <Loading />}
      {/* <Loading /> */}
      <section className="new-blog-header">
        <h1>welcome {name && name} </h1>
        <p>let's create a new blog</p>
      </section>

      <section className="new-blog-grid-container">
        <div className="content-box"></div>
        <div className="content-box">
          <section className="register-form-section">
            <div className="holding-box"></div>
            <div className="holding-box">
              <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={onChange}
                    className="form-input"
                    name="author"
                    placeholder="Blog Author"
                    // required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="blogTitle"
                    id="blogTitle"
                    value={blogTitle}
                    onChange={onChange}
                    className="form-input"
                    name="blogTitle"
                    placeholder="Blog BlogTitle"
                    // required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={onChange}
                    className="form-input"
                    name="category"
                    placeholder="Blog Category"
                    autoComplete="on"
                    // required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="blogBody"
                    onChange={onChange}
                    id="blogBody"
                    value={blogBody}
                    className="form-input blog-input-body"
                    placeholder="Blog Text"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="check-form-control">
                    <input
                      onChange={onChange}
                      type="checkbox"
                      name="featured"
                      value={false}
                      checked={featured}
                    />
                    featured
                  </label>

                  <label className="check-form-control">
                    <input
                      onChange={onChange}
                      type="checkbox"
                      name="publish"
                      value={false}
                      checked={publish}
                    />
                    publish
                  </label>
                </div>

                <div className="form-group">
                  <input className='file-input' type="file" name="files[]" multiple />
                </div>

                <div className="form-group form-btn-container create-blog-btn-container">
                  <button
                    onClick={handleClearForm}
                    type="button"
                    className="form-btn clear-blog-text-btn create-blog-btn"
                  >
                    clear all
                  </button>
                  <button className="form-btn create-blog-btn">create blog</button>
                </div>
              </form>
              <MiddelCollumnAdvert />
            </div>

            <div className="holding-box"></div>
          </section>
        </div>
        <div className="content-box"></div>
      </section>
    </div>
  )
}

export default NewBlog
