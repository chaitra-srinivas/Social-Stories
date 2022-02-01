import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='Jumbotron'>
      <h1>Social Stories</h1>
      <p>
        An app that helps you build and store social stories to help students
        with special needs
        <br />
        Already a registered user?
      </p>
      <Link to='/login' className='btn btn-secondary'>
        Login
      </Link>
      <p>New User?</p>
      <Link to='/signup' className='btn btn-secondary'>
        Register
      </Link>
    </div>
  );
}

export default Home;
