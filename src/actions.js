import React from "react";
import { v4 as uuid } from "uuid";
import thunk from "redux-thunk";
import axios from 'axios';

const BASE_API_URL = "http://localhost:5000"

function getPostsFromAPI() {
  return async function(dispatch) {
    let res = await axios.get(`${BASE_API_URL}/api/posts`);
    let posts = res.data;
    console.log("RES", res);
    let titles = posts.map(item => item.title);
    dispatch(gotPosts(posts));
  };
}

function gotPosts(posts) {
return { 
  type: "LOAD_POSTS", 
  posts,
  }
};

function getPostFromAPI(postId) {
  return async function(dispatch) {
    let res = await axios.get(`${BASE_API_URL}/api/posts/${postId}`);
    let post = res.data;
    console.log("SinglePost", res);
    dispatch(gotDetail(post));
  };
}

function gotDetail(post) {
return { 
  type: "LOAD_DETAIL", 
  post,
  }
};


function addPostAPI(title, description, body, comments = []) {
  return async function(dispatch) {
    let res = await axios.post('/api/posts', title, description, body, comments = []);
    dispatch(addPostCreator(title, description, body, comments = []));
   };
 }

const addPostCreator = (title, description, body, comments = []) => {
  return {
    type: "CREATE_POST",
    payload: {
      title: title,
      description: description,
      body: body,
      id: uuid(),
      comments: comments,
    },
  };
};

const editPostCreator = (title, description, body, postId) => {
  return {
    type: "EDIT_POST",
    payload: {
      title: title,
      description: description,
      body: body,
      id: postId,
    },
  };
};

const deletePostCreator = (postId) => {
  return {
    type: "DELETE_POST",
    payload: {
      id: postId,
    },
  };
};

const addCommentCreator = (postId, body) => {
  return {
    type: "CREATE_COMMENT",
    payload: {
      postId: postId,
      body: body
    }
  };
};

export {
  addPostCreator,
  editPostCreator,
  deletePostCreator,
  addCommentCreator,
  gotPosts,
  getPostsFromAPI,
  addPostAPI,
  getPostFromAPI
};
