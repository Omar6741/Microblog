import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";  


function NavBar() {
    return (
      <div> 
        <Navbar expand="md">
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink to="/">Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/new">Add a New Post</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
  
  export default NavBar;