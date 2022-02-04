import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../pages/Navigation";
import "../../App.css";

function StoryTemplate() {
  const templates = require("./templates.json");

  const [formData, setFormData] = useState("Choose template");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormData("Choose template");
  };

  return (
    <div>
      <Navigation />
      <div>
        <h2>Please choose a template:</h2>
        <div className='ui form' onSubmit={handleFormSubmit}>
          <div className='field'>
            <label style={{ padding: "20px" }} id="storyList">Story template:</label>
            <select
              className='ui select dropdown'
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
            <Link to={`/stories/${formData.template}/new`} id='btnSubmit' fluid size='large' type='submit'>
              Submit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryTemplate;
