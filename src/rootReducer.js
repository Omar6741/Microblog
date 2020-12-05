import React from 'react';
import { useSelector } from 'react-redux';

const INITIAL_STATE = { posts: [] };

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CREATE_POST":
      const post = action.payload;
      return { ...state, posts: [...state.posts, post] };

    case "EDIT_POST":
      const postUpdates = action.payload;
      const postId = postUpdates.id;
      const postNew = state.posts.find((item) => item.id === postId);

      const arrayId = state.posts.indexOf(postNew);
      state.posts[arrayId] = {
        ...state.posts[arrayId],
        title: postUpdates.title,
        description: postUpdates.description,
        body: postUpdates.body,
      };
      return { ...state };

    case "DELETE_POST":
      //const postToBeAxed = state.posts.find((post) => post.id === action.payload.id);
      //const ind = state.posts.indexOf(postToBeAxed);
      //return { ...state, posts: [...state.posts.splice(ind, 1)] };
      return {
        ...state,
        posts: [...state.posts.filter((item) => item.id !== action.payload.id)],
      };

    case "CREATE_COMMENT":
      const postCommented = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      postCommented.comments = [...postCommented.comments, action.payload.body];
      return { ...state };

    case "LOAD_POSTS":
      return ({...state, posts: action.posts});

    case "LOAD_DETAIL":
    return ({...state, post: action.post});

    default:
      return state;
  }
}

export default rootReducer;
