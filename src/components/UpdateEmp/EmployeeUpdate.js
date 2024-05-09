import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../API/api' // Import the API configuration

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
    api.get(`/employees/${id}`).then((response) => {
      setEmployee(response.data)
    })
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployee({
      ...employee,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:8081/api/v1/employees/${id}`, employee)
      .then(() => {
        history('/')
      })
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
