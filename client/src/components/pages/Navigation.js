import React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className='nav ui secondary pointing menu stackable' id='navMenu'>
      <NavLink id='navItem' className='item' to='/' activeclassname='active'>
        Home
      </NavLink>
      {Auth.loggedIn() ? (
        <>
          <NavLink
            id='navItem'
            to='/stories'
            className='item'
            activeclassname='active'>
            View Stories
          </NavLink>
          <NavLink
            id='navItem'
            to='/template'
            className='item'
            activeclassname='active'>
            Create Story
          </NavLink>
          <div className='right menu'>
            <NavLink
              id='navItem'
              className='item'
              to='/profile'
              activeclassname='active'>
              {Auth.getProfile().data.username}'s profile
            </NavLink>
            <button id='navItem' className='item' onClick={logout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='right menu'>
            <NavLink
              id='navItem'
              className='item'
              to='/login'
              activeclassname='active'>
              Login
            </NavLink>
            <NavLink
              id='navItem'
              className='item'
              to='/signup'
              activeclassname='active'>
              Signup
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
