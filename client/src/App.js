import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import Home from "./components/pages/Home";
import ArticleList from "./components/articles/ArticleList";
import ArticleInfo from "./components/articles/ArticleInfo";
import ArticleAdd from "./components/articles/ArticleAdd";
import ArticleEdit from "./components/articles/ArticleEdit";

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
            <NavLink exact className='nav-link' activeClassName='active' to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              className='nav-link'
              activeClassName='active'
              to='/articles'>
              Articles
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
      <Route exact path='/' component={Home} />
      <Route exact path='/articles' component={ArticleList} />
      <Route exact path='/articles/new' component={ArticleAdd} />
      <Route exact path='/articles/:_id' component={ArticleInfo} />
      <Route exact path='/articles/:_id/edit' component={ArticleEdit} />
    </Routes>
  );
}

export default App;
