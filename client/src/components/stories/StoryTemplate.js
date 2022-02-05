import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../pages/Navigation";
import "../../App.css";

function StoryTemplate() {
  const templates = require("./templates.json");

  return (
    <div>
      <Navigation />
      <h2>Please choose a template:</h2>
      <div className='ui cards'>
        {templates.map((template) => {
          return (
            <div className='card' key={template.id}>
              <div className='content'>
                <div className='header'>{template.title}</div>
                <div className='description'>{template.description}</div>
              </div>
              <Link to={`/stories/${template.id}/new`} type='submit'>
                <div className='ui bottom attached button'>
                  <i className='add icon'></i>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StoryTemplate;
