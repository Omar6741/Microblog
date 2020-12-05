import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./HomeList.css";
import { ListGroupItem } from "reactstrap";
import { getPostsFromAPI } from './actions.js';

function Homepage() {
  // const res = getPostsFromAPI();
  // console.log("APPPPIII CAAALLLL", res);
  let posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPostsFromAPI())
  }, [dispatch]);
console.log(posts);

  return (
    <div>
      <h1> Welcome to the Microblog</h1>
      {posts.map((post) => (
        <ListGroupItem>
          <Link to={`/${post.id}`}>Title: {post.title}</Link>
          <br />
          {post.description}
        </ListGroupItem>
      ))}
    </div>
  );
}

export default Homepage;
