import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom' // Import useHistory
import api from './API/api' // Import the API configuration

const EmployeeDelete = () => {
  const { id } = useParams()
  const history = useNavigate()

  useEffect(() => {
    api.delete(`/employees/${id}`).then(() => {
      history.push('/employee-list')
    })
  }, [id, history])

  return (
    <div>
      <h2>Delete Employee</h2>
      {/* You can add a message here to indicate that the employee is being deleted */}
    </div>
  )
}

export default EmployeeDelete
