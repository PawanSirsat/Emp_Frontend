import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css' // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  const linkStyle = {
    textDecoration: 'none', // Remove underlines from links
    color: '#fff', // Link color
    fontWeight: 'bold',
    transition: 'color 0.3s', // Smooth color transition on hover
  }

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className='menu-icon' onClick={toggleNavbar}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to='/' style={linkStyle} onClick={toggleNavbar}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/branch' style={linkStyle} onClick={toggleNavbar}>
            Branch List
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
