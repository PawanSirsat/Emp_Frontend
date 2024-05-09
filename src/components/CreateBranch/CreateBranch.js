import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../API/api' // Import the API configuration
import './CreateBranch.css' // Import your CSS file for styling

const CreateBranch = () => {
  const [branch, setBranch] = useState({
    branchName: '',
    employeeId: '',
  })

  const history = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBranch({
      ...branch,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('/branches/create', branch).then(() => {
      history('/branch') // Redirect to the branches page or any other desired URL
    })
  }

  return (
    <div className='create-branch-container'>
      <div className='create-branch-form'>
        <h2>Create Branch</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Branch Name:</label>
            <input
              type='text'
              className='form-control'
              name='branchName'
              value={branch.branchName}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Employee ID:</label>
            <input
              type='text'
              className='form-control'
              name='employeeId' // Change from empId to employee
              value={branch.employeeId}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Create Branch
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBranch
