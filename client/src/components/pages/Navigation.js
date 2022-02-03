import { Button } from "bootstrap";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import Auth from "../../utils/auth";

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  //state = { activeItem: 'home' }

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  return (
    <div className='ui secondary pointing menu'>
      <NavLink className='active item' to='/'>
        Home
      </NavLink>

      {Auth.loggedIn() ? (
        <>
          <Link to='/stories' className='item'>
            View Stories
          </Link>

          <Link to='/template' className='item'>
            Create Story
          </Link>
          <div className='right menu'>
            <Link className='item' to='/'>
              {Auth.getProfile().data.username}'s profile
            </Link>
            <button  className='item' onClick={logout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='right menu'>
            <Link className='item' to='/login'>
              Login
            </Link>
            <Link className='item' to='/signup'>
              Signup
            </Link>
          </div>
        </>
      )}
    </div>

    /*  <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-4'>
      <div className='container flex justify-between'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink className='nav-link' activeclassname='active' to='/'>
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
              <button className='btn btn-md btn-light m-2' onClick={logout}>
                Logout
              </button>
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
    </nav> */
  );
}

export default Navigation;
