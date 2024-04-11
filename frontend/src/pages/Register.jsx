import { useState } from 'react'
import MiddelCollumnAdvert from '../components/advert components/MiddelCollumnAdvert'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          console.log(user)
          toast.success(`Registered new user: ${user.name}`)
          navigate('/')
        })
        .catch((err) => toast.error(err))
    }
  }

  return (
    <>
      <div className="page-container">
        <section className="register-heading">
          <h1 className="register-h1">
            <p>
              <i className="fa-solid fa-right-to-bracket register-arrow"></i>{' '}
              register here
            </p>
            <p>
              for your <span className="free-span">free</span> account
            </p>
          </h1>
        </section>

        <section className="register-form-section">
          <div className="holding-box"></div>
          <div className="holding-box">
            <form onSubmit={onSubmit} className="form">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChange}
                  className="form-input"
                  name="name"
                  placeholder="Enter Name"
                  // required
                />
              </div>
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
              <div className="form-group">
                <input
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={onChange}
                  className="form-input"
                  name="password2"
                  placeholder="Confirm password"
                  autoComplete="on"
                  // required
                />
              </div>
              <div className="form-group form-btn-container">
                <button className="form-btn">register me</button>
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

export default Register
