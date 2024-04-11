import { images } from '../img/temp-imgs/tempImgs'
import { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserBlog } from '../features/blog/blogSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  toggleUpdateModal,
  toggleDeleteModal,
  setDeleteCode,
} from '../features/blog/blogSlice'

import boat from '../img/boat.jpg'
import UpdateBlogModal from '../components/modals/UpdateBlogModal'
import DeleteBlogModal from '../components/modals/DeleteBlogModal'
function UserBlogPage() {
  // const params = useParams()
  const { blogID } = useParams()

  const dispatch = useDispatch()
  const { blog, showUpdateModal, showDeleteModal } = useSelector((state) => state.blogs)
  const blogImages = blog.images
  console.log(blogImages && blogImages.length)
  console.log(blogImages && blogImages.length)
  const { blogBody, category, blogTitle, status, edited, author } = blog
  const [wordCount, setWordCount] = useState(100)

  console.log(author)
  // console.log(blogBody && blogBody.split(' '))
  useEffect(() => {
    dispatch(getUserBlog(blogID))
    // .unwrap().catch(toast.error)
  }, [blogID])

  const [chunks, setChunks] = useState(null)

  useEffect(() => {
    if (blogBody) {
      const blogWords = blogBody && blogBody.split(' ')
      const chunks = []
      let currentChunk = []

      for (let i = 0; i < blogWords.length; i++) {
        currentChunk.push(blogWords[i])

        if (currentChunk.length === wordCount || i === blogWords.length - 1) {
          chunks.push(currentChunk.join(' '))
          currentChunk = []
        }
      }

      setChunks(chunks)
    }
  }, [blogBody, wordCount])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1300) {
        setWordCount(150)
      } else {
        setWordCount(100)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array ensures it runs only once

  const handleToggleUpdate = () => {
    dispatch(toggleUpdateModal(!showUpdateModal))
  }
  const handleToggleDelete = () => {
    dispatch(setDeleteCode('12345'))
    dispatch(toggleDeleteModal(!showDeleteModal))
  }

  let chunkCount = 0
  let imgCount = 0
  console.log(chunks)

  // getBoundingClientRect
  // check which dependencies are used for scroll check
  const handleScrollClick = (e) => {
    console.log('object')
    window.scrollTo({
      left: 0,
      top: 0,
    })
  }

  return (
    <div className="page-container">
      {showUpdateModal && <UpdateBlogModal />}
      <div className="blog-page-hero">
        {showDeleteModal && <DeleteBlogModal />}
        <img className="hero-img" src={blogImages && blogImages[0]} alt="" />

        <div className="blog-post-title-div">
          <p>{blogTitle}</p>
          <p>by {author}</p>
        </div>

        <div className="blog-post-country-div">
          <p>{category && category.toLowerCase()}</p>
        </div>
      </div>

      <section className="blog-page-info">
        <h2>Blog Written By {author}</h2>
        <p>{blogTitle}</p>

        <div className="blog-controls-container">
          <button onClick={handleToggleUpdate} className="update-blog-btn blog-btn">
            update
          </button>
          <button onClick={handleToggleDelete} className="delete-blog-btn blog-btn">
            {showDeleteModal ? 'close' : 'delete'}
          </button>
        </div>
      </section>

      {/* make agian with the async await */}
      {/* if no images display text and if no text display images  */}
      {/* first clicked first in  */}
      {/* use the async awaint to retrieve FRESH blog info and UPDATE the views  */}
      <section className="blog-page-content-container">
        <div className="blog-post">
          {chunks &&
            chunks.map((paragraph, index) => {
              if (blogImages[index]) {
                {
                  chunkCount++
                  console.log(chunkCount)
                }
                // Check if image exists for this paragraph
                return (
                  <div
                    key={index}
                    className={`post-section  ${index % 2 === 0 && 'alternate'}`}
                  >
                    <div className={`side-img-container ${index % 2 && 'alt-img'}`}>
                      <img src={blogImages[index]} alt="" className="side-img" />
                    </div>
                    <div className="side-text-container">
                      <p>{paragraph}</p>
                    </div>
                  </div>
                )
              } else {
                return null // Don't render anything if no image
              }
            })}
          <div className="extra-text-container">
            {chunks &&
              chunks.length > chunkCount &&
              chunks.slice(chunkCount).map((paragraph, index) => {
                return (
                  <p key={index} className="extra-text-paragraph">
                    {paragraph}
                  </p>
                )
              })}
          </div>

          <div className="extra-img-container">
            {blogImages &&
              blogImages.length > chunkCount &&
              blogImages.slice(chunkCount).map((img, index) => {
                return <img key={index} src={img} alt="" className="side-img" />
              })}
          </div>
        </div>

        {/*   delete contianer */}
        <div className="scroll-up-cotainer">
          <button onClick={handleScrollClick} className="scroll-up-btn">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </div>
  )
}

export default UserBlogPage

//  how to re-write this so that it loops and displays the text and images ONLY up until we run out of images
