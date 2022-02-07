import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Navigation from "./Navigation";
import "../../App.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Loader,
} from "semantic-ui-react";
import logo from "../images/SocialStories.gif";

import Auth from "../../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="home ui center aligned container">
      <Navigation />
      <Grid
        textAlign='center'
        style={{ height: "70vh" }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header id='loginHeader' textAlign='center'>
            <Image src={logo} /> Log-in
          </Header>
         {data ? (
            <p>
              <Loader active inline='centered' />
              Successful login! <br/>
              You can now view, share and create social stories!
            </p>
          ) : ( 
            <Form size='large' onSubmit={handleFormSubmit}>
              <Segment>
                <Form.Input
                  required
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <Form.Input
                  required
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button id='btnSubmit' fluid size='large' type='submit'>
                  Login
                </Button>
                <Message id='msg'>
                  New user? <Link to='/signup'>Sign Up</Link>
                </Message>
              </Segment>
            </Form>
           )} 
          {error && <div id='errorMsg'>{error.message}</div>}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
