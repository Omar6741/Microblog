import React, { useState, useEffect } from "react";
import { addCommentCreator } from "./actions";
import { useSelector, useDispatch } from "react-redux";

function Comment({ post, posts }) {
  const [commData, setCommData] = useState("");
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  //   const postComments = post.comments;
  const postComments = useSelector((state) => {
    const ind = posts.indexOf(post);
    console.log("POST.COOOMMMENTS", post.comments);
    return post.comments;
  });

  function commentSubmit(evt) {
    evt.preventDefault();
    const postId = post.id;
    const action = addCommentCreator(postId, commData);
    dispatch(action);
  }

  function commentChange(evt) {
    let { name, value } = evt.target;
    setCommData((cData) => ({
      ...cData,
      [name]: value,
    }));
  }

  let commentList = postComments.map((item) => <li>{item.text}</li>);

  return (
    <div>
      <ul>{commentList}</ul>
      <form onSubmit={commentSubmit}>
        <label>
          {" "}
          Comment On This Post:
          <textarea onChange={commentChange} name="comment"></textarea>
        </label>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default Comment;
