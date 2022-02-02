import React from "react";

import Navigation from "./Navigation";

function Home() {
  return (
    <div className='Jumbotron'>
      <Navigation />
      <h1>Social Stories</h1>
      <p>
        An app that helps you build and store social stories to help students
        with special needs
        <br />
        Already a registered user?
      </p>
    </div>
  );
}

export default Home;
