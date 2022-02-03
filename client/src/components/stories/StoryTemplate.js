import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../pages/Navigation";
import Auth from "../../utils/auth";

function StoryTemplate() {
  const templates = require("./templates.json");

  const [formData, setFormData] = useState("Choose template");

/*   if (Auth.loggedIn() && Auth.getProfile().data.username) {
    return <Link to='/template' />;
    //return(<p>You are logged In</p>);
  }
  if (!Auth.getProfile().data.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  } */

  //const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormData("Choose template");
  };

  return (
    <div className='jumbotron'>
      <Navigation />
      <h1>Welcome!</h1>
      <form onSubmit={handleFormSubmit}>
        <label className='m-2'>Choose a template:</label>
        <select
          id='selectTemplate'
          name='template'
          onChange={handleInputChange}>
          <option disabled value='Choose template'>
            Select
          </option>
          {templates.map((template) => {
            return (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            );
          })}
        </select>
        <Link
          to={`/stories/${formData.template}/new`}
          className='btn btn-secondary'>
          Submit
        </Link>
      </form>
    </div>
  );
}

export default StoryTemplate;
