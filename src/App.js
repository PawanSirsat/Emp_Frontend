import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmployeeList from './components/EmpListPage/EmployeeList'
import CreateEmployee from './components/CreateEmp/CreateEmployee'
import EmployeeUpdate from './components/UpdateEmp/EmployeeUpdate'
import EmployeeDelete from './components/DeleteEmployee'
import EmployeeBranchList from './components/BranchListPage/EmployeeBranchList'
import CreateBranch from './components/CreateBranch/CreateBranch'

import Navbar from './components/Navbar/Navbar' // Import the Navbar component

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar /> {/* Include the Navbar component */}
        <Routes>
          <Route path='/' element={<EmployeeList />} />
          <Route path='/create' element={<CreateEmployee />} />
          <Route path='/delete/:id' element={<EmployeeDelete />} />
          <Route path='/update/:id' element={<EmployeeUpdate />} />
          <Route path='/branch' element={<EmployeeBranchList />} />
          <Route path='/createbranch' element={<CreateBranch />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
