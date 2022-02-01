import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function Home() {
  const templates = require("../stories/templates.json");

  const [formData, setFormData] = useState("Choose template");

  //const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormData("Choose template");
  };

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
