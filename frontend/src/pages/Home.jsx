import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <div className="page-container">
        <section className="home-header">
          <Link to="new-blog">new blog</Link>
        </section>

        <section className="home-blog-pasts"></section>
      </div>
    </>
  )
}

export default Home
