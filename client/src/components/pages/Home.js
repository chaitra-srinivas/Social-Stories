import React from "react";

import Navigation from "./Navigation";
//import Happykids from "https://image.pngaaa.com/785/459785-middle.png";
//import happy from "../../../src/components/images/homepage.png";

function Home() {
  return (
    <div className='Jumbotron'>
      <Navigation />
      <h1>Social Stories</h1>
      <div className='justify-center'>
        {/*  <image
          src={require(Happykids)}
          className='mx-auto'
          alt='Happykids'
        />  */}
     
      <p>
        An app that helps you build and store social stories to help students
        with special needs
        <br />
        Please login to be able to see and create stories.
      </p>
    </div>
    </div>
  );
}

export default Home;
