import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

const LoginPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8081/auth/login', { email, password })
      .then((response) => {
        const token = response.data.jwtToken
        if (token) {
          localStorage.setItem('jwtToken', token)
          console.log('Token Generated: ' + token)
          props.setIsAuthenticated(true)
          setErrorMessage('') // Clear any previous error messages
          navigate('/home')
        } else {
          console.error('No token received, redirecting to login')
          props.setIsAuthenticated(false)
          setErrorMessage('No token received, please try again.')
        }
      })
      .catch((error) => {
        console.error('Login failed:', error)
        props.setIsAuthenticated(false)
        setErrorMessage('Invalid credentials, please try again.')
      })
  }

  return (
    <div className='main-container'>
      <div className='content'>
        <h2 className='mb-4'>Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
