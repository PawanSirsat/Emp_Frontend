import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const linkStyle = {
    textDecoration: "none", // Remove underlines from links
    color: "#fff", // Link color
    fontWeight: "bold",
    transition: "color 0.3s", // Smooth color transition on hover
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/create" style={linkStyle}>
            Create Employee
          </Link>
        </li>
        <li>
          <Link to="/branch" style={linkStyle}>
            Branch List
          </Link>
        </li>

        <li>
          <Link to="/createbranch" style={linkStyle}>
            Create Branch 
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
