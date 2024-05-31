import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './EmployeeList.css' // Import your CSS file for styling

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

  const linkStyle = {
    textDecoration: 'none', // Remove underlines from links
    color: 'blue', // Link color
    fontWeight: 'bold',
    transition: 'color 0.3s', // Smooth color transition on hover
    marginRight: '20px', // Corrected property name
    padding: '5px',
    border: '3px solid red',
    borderRadius: '15px', // Corrected property name
  }

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken')
      if (token) {
        const response = await axios.get(
          'http://localhost:8081/api/v1/employees',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.status === 200) {
          setEmployees(response.data)
        } else {
          console.log('200')
        }
      } else {
        console.log('no token')
        navigate('/login')
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
        console.error('Response headers:', error.response.headers)
      } else if (error.request) {
        console.error('No response received:', error.request)
      } else {
        console.error('Error setting up the request:', error.message)
      }
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken')
      if (token) {
        const response = await axios.delete(
          `http://localhost:8081/api/v1/employees/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 204) {
          fetchUserData()
        } else {
          console.log('200')
          navigate('/login')
        }
      } else {
        console.log('no token')
        navigate('/login')
      }
    } catch (error) {
      console.error('Failed to delete user data:', error.toJSON().message)
      // Handle errors, e.g., token expiration
    }
  }

  return (
    <div>
      <h2>Employee Management Page</h2>
      <Link to='/create' style={linkStyle}>
        Create Employee
      </Link>
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
    </div>
  )
}

export default EmployeeList
