import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className='nav ui secondary pointing menu' id='navMenu'>
      <Link id='navItem' className='item' to='/'>
        Home
      </Link>
      {Auth.loggedIn() ? (
        <>
          <Link id='navItem' to='/stories' className='item'>
            View Stories
          </Link>
          <Link id='navItem' to='/template' className='item'>
            Create Story
          </Link>
          <div className='right menu'>
            <Link id='navItem' className='item' to='/'>
              {Auth.getProfile().data.username}'s profile
            </Link>
            <button id='navItem' className='item' onClick={logout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='right menu'>
            <Link id='navItem' className='item' to='/login'>
              Login
            </Link>
            <Link id='navItem' className='item' to='/signup'>
              Signup
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
