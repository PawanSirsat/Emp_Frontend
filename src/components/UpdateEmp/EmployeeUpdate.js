import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './EmployeeUpdate.css' // Import your CSS file for styling

const EmployeeUpdate = () => {
  const { id } = useParams()
  const history = useNavigate()

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  })

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('jwtToken') // Get the JWT token from localStorage

        const response = await axios.get(
          `http://localhost:8081/api/v1/employees/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Add the JWT token to the Authorization header
            },
          }
        )
        setEmployee(response.data)
      } catch (error) {
        console.error('Error fetching employee data:', error)
      }
    }

    fetchEmployee()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployee({
      ...employee,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('jwtToken') // Get the JWT token from localStorage
      if (token) {
        await axios.put(
          `http://localhost:8081/api/v1/employees/${id}`,
          employee,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Add the JWT token to the Authorization header
            },
          }
        )
        history('/')
      } else {
        console.log('No token found, redirecting to login page')
        history('/login') // Redirect to the login page if no token is found
      }
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  return (
    <div className='employee-update-container'>
      <div className='employee-update-form'>
        <h2>Update Employee</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmployeeUpdate
