import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Navigation from "./Navigation";
import Happykids from "../images/homepage.png";
import "../../App.css";

function Home() {
  return (
    <div className='home ui center aligned container'>
      <Navigation />
        <Grid columns={1} padded>
          <Grid.Row>
            <h1>Social Stories</h1>
            <div className='ui raised segment' id="frontCover">
            <Image src={Happykids} className='img' size='large' centered />
            </div>
            <div id="tagLine">
             A place to find, create and store social stories.
              <br />
             Make learning fun!
            </div>
          </Grid.Row>
        </Grid>
    </div>
  );
}

export default Home;
