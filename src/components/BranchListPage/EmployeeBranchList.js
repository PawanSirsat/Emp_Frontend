import React, { useState, useEffect } from 'react'
import api from '../API/api' // Import the API configuration
import { Link } from 'react-router-dom'

import './EmployeeBranchList.css' // Import the CSS file

const EmployeeBranchList = () => {
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }
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
  useEffect(() => {
    // Make an API request to fetch the data
    api.get('/employees').then((response) => {
      setData(response.data)
    })
  }, []) // Empty dependency array ensures the effect runs once

  console.log(data)
  return (
    <div>
      <h2>Employee Branch List</h2>
      <Link to='/createbranch' style={linkStyle} onClick={toggleNavbar}>
        Create Branch
      </Link>
      <table>
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>Employee Name</th>
            <th>Branch Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                {item.branches.length > 0
                  ? item.branches[0].branchName
                  : 'No Branch'}
              </td>
              <td>{item.emailId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeBranchList
