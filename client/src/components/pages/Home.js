import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Navigation from "./Navigation";
import Happykids from "../images/homepage.png";
import '../../App.css';

function Home() {
  return (
    <div className='home'>
      <Navigation />
      <Grid columns={1} padded>
        <Grid.Row>
          <h1>Social Stories</h1>
          
            <Image src={Happykids} className='img' size='large' centered />
            <p padded centered>
              An app that helps you build and store social stories to help
              students with special needs
              <br />
              Please login to be able to see and create stories.
            </p>
         
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
