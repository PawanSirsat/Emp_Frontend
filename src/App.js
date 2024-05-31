import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmployeeList from './components/EmpListPage/EmployeeList'
import CreateEmployee from './components/CreateEmp/CreateEmployee'
import EmployeeUpdate from './components/UpdateEmp/EmployeeUpdate'
import EmployeeDelete from './components/DeleteEmployee'
import EmployeeBranchList from './components/BranchListPage/EmployeeBranchList'
import CreateBranch from './components/CreateBranch/CreateBranch'
import Navigation from './components/Navbar/Navigation'
import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for a valid JWT token in local storage
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  // Function to set isAuthenticated to true upon successful login
  const handleSuccessfulLogin = () => {
    setIsAuthenticated(true)
  }
  return (
    <Router>
      <div className='App'>
        <Navigation
          isAuthenticated={isAuthenticated}
          onLogout={() => setIsAuthenticated(false)}
        />{' '}
        <Routes>
          <Route
            path='/login'
            element={<LoginPage setIsAuthenticated={handleSuccessfulLogin} />}
          />
          <Route path='/' element={<EmployeeList />} />

          <Route path='/home' element={<EmployeeList />} />
          <Route path='/signup' element={<Signup />} />

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
