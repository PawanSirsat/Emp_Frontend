import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../API/api' // Import the API configuration

import './EmployeeBranchList.css' // Import the CSS file

const EmployeeBranchList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // Make an API request to fetch the data
    api.get('/branches').then((response) => {
      setData(response.data)
    })
  }, []) // Empty dependency array ensures the effect runs once

  return (
    <div>
      <h2>Employee Branch List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
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
              <td>{item.employee.id}</td>
              <td>
                {item.employee.firstName} {item.employee.lastName}
              </td>
              <td>{item.branchName}</td>
              <td>{item.employee.emailId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeBranchList
