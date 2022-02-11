import * as React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

import StoryList from "./components/stories/StoryList";
import StoryAdd from "./components/stories/StoryAdd";
import StoryInfo from "./components/stories/StoryInfo";
import StoryEdit from "./components/stories/StoryEdit";
import StoryTemplate from "./components/stories/StoryTemplate";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
      <Route exact path='/template' element={<StoryTemplate />} />
      <Route exact path='/stories' element={<StoryList />} />
      <Route exact path='/stories/:id/new' element={<StoryAdd />} />
      <Route exact path='/stories/:id' element={<StoryInfo />} />
      <Route exact path='/stories/:id/edit' element={<StoryEdit />} />
      <Route exact path='/profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
