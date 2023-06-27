"use client";

import { useEffect, useContext } from "react";

import { PostsContext } from "../AppContext";

export default function Posts() {
  const { posts } = useContext(PostsContext);

  return (
    <main>
      <h1>Message Board</h1>
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </main>
  );
}
