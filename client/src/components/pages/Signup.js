import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Navigation from "./Navigation";
import Auth from "../../utils/auth";
import "../../App.css";

import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import logo from "../images/SocialStories.gif";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
    console.log();

    let errorObj = String;

    try {
      if (!formState.email || !formState.password || !formState.username) {
        console.log("details missing");
        errorObj = "Please enter required fields";
        return errorObj;
      }
      const { data } = await addUser({
        variables: { ...formState },
      });

      console.log(data);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Navigation />
      <Grid
        textAlign='center'
        style={{ height: "70vh" }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header id='loginHeader' textAlign='center'>
            <Image src={logo} /> Signup
          </Header>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to='/template'>Create a new story.</Link>
            </p>
          ) : (
            <Form size='large' onSubmit={handleFormSubmit}>
              <Segment>
                <Form.Input
                  required
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Your username'
                  name='username'
                  type='text'
                  value={formState.username}
                  onChange={handleChange}
                />
                <Form.Input
                  required
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Your email'
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
                  placeholder='******'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button id='btnSubmit' fluid size='large' type='submit'>
                  Submit
                </Button>
              </Segment>
            </Form>
          )}
          {error && <div id='errorMsg'>{error.message}</div>}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Signup;
