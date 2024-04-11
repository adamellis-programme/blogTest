import MiddelCollumnAdvert from '../components/advert components/MiddelCollumnAdvert'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        console.log(user)
        toast.success(`Signed in as: ${user.name}`)
        navigate('/')
      })
      .catch(toast.error)
  }

  return (
    <>
      <div className="page-container">
        <section className="signin-heading">
          <h1 className="signin-h1">
            <p>
              <i className="fa-solid fa-user"></i> signin here
            </p>
            <p className="login-title-2">
              login to your <span className="login-acount">account</span>{' '}
            </p>
          </h1>
        </section>

        <section className="register-form-section">
          <div className="holding-box"></div>
          <div className="holding-box">
            <form onSubmit={onSubmit} className="form">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  className="form-input"
                  name="email"
                  placeholder="Enter Email"
                  // required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  className="form-input"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="on"
                  // required
                />
              </div>
              <div className="form-group form-btn-container">
                <button className="form-btn">log me in</button>
              </div>
            </form>

            <MiddelCollumnAdvert />
          </div>

          <div className="holding-box"></div>
        </section>
      </div>
    </>
  )
}

export default SignIn
