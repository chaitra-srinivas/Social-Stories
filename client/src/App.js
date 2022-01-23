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
             className='nav-link' activeclassname='active' to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
            //  exact
              to='/stories'
              className='nav-link'
              activeclassname='active'
              >
              Social Stories
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
      {/*   <Route exact path='/' element={<Home/>} /> */}
      <Route exact path='/' element={<Home />} />
      <Route exact path='/stories' element={<StoryList />} />

      <Route exact path='/stories/new' element={<StoryAdd />} />

      <Route exact path='/stories/:id' element={<StoryInfo />} />

      <Route exact path='/stories/:id/edit' element={<StoryEdit />} />
    </Routes>
  );
}

export default App;
