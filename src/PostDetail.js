import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { deletePostCreator, editPostCreator, getPostFromAPI } from "./actions.js";

function PostDetail() {
  const [editing, setEditing] = useState(false);
  const history = useHistory();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  let post = posts.find((post) => post.id === postId);
  const detail = useSelector(state => state.post);

  const [fdata, setFdata] = useState(post);
 
  useEffect(() => {
    dispatch(getPostFromAPI(postId))
  }, [dispatch]);
console.log("POOOOSSSTTTTDEETTTAAAIILLL",detail);

  function handleDelete() {
    const action = deletePostCreator(post.id);
    dispatch(action);
    history.push("/");
  }

  function handleEdit(evt) {
    evt.preventDefault();
    setEditing(true);
  }

  function onChange(evt) {
    const { name, value } = evt.target;
    setFdata((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  }

  function submit(evt) {
    evt.preventDefault();
    const action = editPostCreator(fdata.title, fdata.description, fdata.body, post.id)
    dispatch(action);
    history.push("/");
  }

  if (!detail) 
    return (
      <div>
        <p> Test </p>
      </div>
    )
  if (editing === false) {
   let post = posts.find((post) => post.id === postId);
   console.log('POST---->', post);
    return (
      <div>
        <h1> Post </h1>
        <p>
          <b>Title</b> {detail.title}
        </p>
        <p>
          <b>Description:</b> {detail.description}
        </p>
        <p>
          <b>Body:</b> {detail.body}
        </p>
        <Link exact to="/edit">
          <button type="submit" onClick={handleEdit}>
            {" "}
            Edit{" "}
          </button>
        </Link>
        <button type="submit" onClick={handleDelete}>
          {" "}
          Delete{" "}
        </button>
        <Comment posts={posts} post={detail} />
      </div>
    );
  }

  if (editing !== false){
    return (
      <div>
        <p>Edit form </p>
        <form onSubmit={submit}>
          <label htmlFor="title">
            {" "}
            Title:
            <input
              type="text"
              name="title"
              onChange={onChange}
              value={fdata.title}
            />
          </label>
          <br />
          <label htmlFor="description">
            {" "}
            Description:
            <input
              type="text"
              name="description"
              onChange={onChange}
              value={fdata.description}
            />
          </label>
          <br />
          <label htmlFor="body">
            {" "}
            Body:
            <br />
            <textarea
              type="textarea"
              rows="7"
              cols="40"
              name="body"
              onChange={onChange}
              value={fdata.body}
            ></textarea>
          </label>
          <br />
          <button type="submit" onClick={submit}>
            Save
          </button>
        </form>
      </div>
    );
    }
}

export default PostDetail;
