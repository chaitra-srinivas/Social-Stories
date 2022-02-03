import React from "react";
import { NavLink, Link } from "react-router-dom";

import Auth from "../../utils/auth";

function Navigation() {
  
  const logout = (event) => {
    event.preventDefault();
   
    Auth.logout();
   
  };

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
          <li></li>

          {Auth.loggedIn() ? (
            <>
              <li className='nav-item'>
                <Link
                  to='/stories'
                  className='nav-link'
                  activeclassname='active'>
                  View Stories
                </Link>
              </li>
              <li>
                <Link
                  to='/template'
                  className='nav-link'
                  activeclassname='active'>
                  Create Story
                </Link>
              </li>
              <Link className='btn btn-md btn-light m-2' to='/'>
                {Auth.getProfile().data.username}'s profile
              </Link>
             {/*  <Link to='/'>
                <button className='btn btn-md btn-light m-2' onClick={logout}>
                  Logout
                </button>
              </Link> */}
              <li>
                <Link to='/' onClick={logout}>
                  <i className='fa fa-sign-out pull-right'></i>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <Link className='btn btn-md btn-light m-2' to='/login'>
                Login
              </Link>
              <Link className='btn btn-md btn-light m-2' to='/signup'>
                Signup
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
