// Tesing Login with material ui
/*
import React from "react";
import './App.css';
import Login from "./components/pages/Login"

function App(){
return(
  <div className="App">
    <Login />
  </div>
);
}

export default App;



Original code
*/
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import Home from "./components/pages/Home";
import StoryList from "./components/stories/StoryList";
import StoryAdd from "./components/stories/StoryAdd";
import StoryInfo from "./components/stories/StoryInfo";
import StoryEdit from "./components/stories/StoryEdit";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import StoryTemplate from "./components/stories/StoryTemplate";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
   
    <ApolloProvider client={client}>
      <Router>
        <Navigation />
        <div className='container'>
          <Main />
        </div>
      </Router>
    </ApolloProvider>
  );
}

function Navigation() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-4'>
      <div className='container'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink
              //exact
              className='nav-link'
              activeclassname='active'
              to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              //  exact
              to='/stories'
              className='nav-link'
              activeclassname='active'>
              View Stories
            </NavLink>
          </li>
          <li>
          <NavLink
              //  exact
              to='/template'
              className='nav-link'
              activeclassname='active'>
              Create Story
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />  
      <Route exact path='/login' element={<Login />} />  
      <Route exact path='/signup' element={<Signup />} /> 
       <Route exact path='/template' element={<StoryTemplate />} />
      <Route exact path='/stories' element={<StoryList />} />
      <Route exact path='/stories/:id/new' element={<StoryAdd />} />
      <Route exact path='/stories/:id' element={<StoryInfo />} />
      <Route exact path='/stories/:id/edit' element={<StoryEdit />} />
    </Routes>
  );
}



export default App;
