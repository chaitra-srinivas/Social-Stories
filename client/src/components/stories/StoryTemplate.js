import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../pages/Navigation";
import {Image} from "semantic-ui-react";
import "../../App.css";

function StoryTemplate() {
  const templates = require("./templates.json");

  return (
    <div  className='home ui center aligned container'>
      <Navigation />
      <h2>Please choose a template:</h2>
      <div className='ui cards centered'>
        {templates.map((template) => {
          return (
            <div className='card' key={template.id}>
              <Image src={template.image} alt="template img"/>
              <div className='content'>
                <div className='header'>{template.title}</div>
                <div className='description'>{template.description}</div>
              </div>
              <Link to={`/stories/${template.id}/new`} type='submit'>
                <div className='ui bottom attached button'>
                  <i className='add icon'></i>Add a story
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
