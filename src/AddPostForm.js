import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AddPostForm({ addPost }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
  });
  const history = useHistory();
  //use effect to make request to backend later **

  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData((oldData) => ({ ...oldData, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    addPost(formData.title, formData.description, formData.body);
    history.push("/");
  }

  function handleCancel(evt) {
    evt.preventDefault();
    setFormData({ title: "", description: "", body: "" });
    history.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          {" "}
          Title:
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
        </label>
        <br />
        <label htmlFor="description">
          {" "}
          Description:
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
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
            onChange={handleChange}
            value={formData.body}
          ></textarea>
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
        <button type="submit" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;
