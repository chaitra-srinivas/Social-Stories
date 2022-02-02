import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-4'>
      <div className='container flex justify-between'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink
              //exact
              className='nav-link'
              activeclassname='active'
              to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              //  exact
              to='/login'
              className='nav-link'
              activeclassname='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              //  exact
              to='/signup'
              className='nav-link'
              activeclassname='active'>
              Signup
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              //  exact
              to='/stories'
              className='nav-link'
              activeclassname='active'>
              View Stories
            </NavLink>
          </li>
          <li>
            <NavLink
              //  exact
              to='/template'
              className='nav-link'
              activeclassname='active'>
              Create Story
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
