"use client";

import { useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { PostContext } from "../AppContext";

export default function CommentForm({ toggleCommentForm }) {
  const { post, setPost } = useContext(PostContext);

  const commentSchema = Yup.object().shape({
    content: Yup.string()
      .required("Required")
      .min(1, "Must Be At Least 1 Character")
      .max(1000, "Must Be No More Than 1000 Characters"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    resetForm,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values) => {
      values.user_id = post.user_id;
      values.post_id = post.id;
      fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedPost = { ...post, comments: [...post.comments, data] };
          setPost(updatedPost);
          resetForm();
          toggleParameterForm();
        });
      resetForm();
      toggleShowForm();
    },
  });

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          name="content"
          type="text"
          onChange={handleChange}
          value={values.content}
        />
        {errors.content && touched.content ? <div>{errors.content}</div> : null}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
