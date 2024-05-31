import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // Import Axios for HTTP requests
import './CreateEmployee.css' // Import your CSS file for styling

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  })
  const [showPopup, setShowPopup] = useState(false) // State variable for controlling popup visibility
  const history = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployee({
      ...employee,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('jwtToken')
    if (token) {
      console.log(token)

      axios
        .post('http://localhost:8081/api/v1/employees', employee, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify content type
          },
        })
        .then(() => {
          setShowPopup(true) // Show popup on successful creation
          console.log('Employee created successfully') // Log success message to console
          // Optionally, you can navigate to another page after successful creation
          history('/')
        })
        .catch((error) => {
          console.error('Error creating employee:', error) // Log error to console
        })
    } else {
      console.error('JWT token not found') // Log error if token is not found in localStorage
    }
  }

  return (
    <div className='create-employee-container'>
      <div className='create-employee-form'>
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>First Name:</label>
            <input
              type='text'
              className='form-control'
              name='firstName'
              value={employee.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Last Name:</label>
            <input
              type='text'
              className='form-control'
              name='lastName'
              value={employee.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              className='form-control'
              name='emailId'
              value={employee.emailId}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </form>
      </div>
      {showPopup && <div className='popup'>Employee created successfully!</div>}
    </div>
  )
}

export default CreateEmployee
