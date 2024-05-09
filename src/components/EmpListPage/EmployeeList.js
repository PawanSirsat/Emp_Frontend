import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import api from '../API/api' // Import the API configuration

import './EmployeeList.css' // Import your CSS file for styling

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = () => {
    api.get('/employees').then((response) => {
      setEmployees(response.data)
    })
  }

  const handleDelete = (id) => {
    axios
      .delete(
        `https://empbackend-production.up.railway.app/api/v1/employees/${id}`
      )
      .then(() => {
        // Employee deleted successfully, update the employees list
        fetchEmployees()
      })
      .catch((error) => {
        console.error('Error deleting employee:', error)
      })
  }

  return (
    <div>
      <h2>Employee List</h2>
      <table className='employee-table'>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.emailId}</td>

              <td>
                <Link to={`/update/${employee.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link to="/create">Create Employee</Link> */}
    </div>
  )
}

export default EmployeeList
