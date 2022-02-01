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
import Navigation from "./components/pages/Navigation";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

import StoryList from "./components/stories/StoryList";
import StoryAdd from "./components/stories/StoryAdd";
import StoryInfo from "./components/stories/StoryInfo";
import StoryEdit from "./components/stories/StoryEdit";
import StoryTemplate from "./components/stories/StoryTemplate";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='container flex-column justify-flex-start min-100-vh'>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
          <Routes>
            <Route exact path='/login' element={<Login />} />
          </Routes>
          <Routes>
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
          <Routes>
            <Route exact path='/menu' element={<Navigation />} />
          </Routes>
          <div className='container'>
            <Main />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function Main() {
  return (
    <Routes>
      {/*   <Route exact path='/' element={<Home />} /> */}
      {/*   <Route exact path='/login' element={<Login />} /> */}
      {/*    <Route exact path='/signup' element={<Signup />} /> */}
      <Route exact path='/template' element={<StoryTemplate />} />
      <Route exact path='/stories' element={<StoryList />} />
      <Route exact path='/stories/:id/new' element={<StoryAdd />} />
      <Route exact path='/stories/:id' element={<StoryInfo />} />
      <Route exact path='/stories/:id/edit' element={<StoryEdit />} />
    </Routes>
  );
}

export default App;
