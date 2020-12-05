import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import AddPostForm from "./AddPostForm";
import { BrowserRouter } from "react-router-dom";
import PostDetail from "./PostDetail";
import NavBar from "./Navbar";
import "./App.css";
import { addPostCreator } from './actions.js';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  
  function addPost(title, description, body, comments = []) {
    const action = addPostCreator(title, description, body, comments = []);
    dispatch(action);  
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Homepage posts={posts} />
          </Route>
          <Route exact path="/new">
            <AddPostForm addPost={addPost} />
          </Route>
          <Route exact path="/:postId">
            <PostDetail posts={posts} addPost={addPost} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
