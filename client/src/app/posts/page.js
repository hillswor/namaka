"use client";

import { useContext } from "react";
import { PostsContext } from "../AppContext";

export default function Posts() {
  const { posts } = useContext(PostsContext);

  return (
    <main className="bg-gray-200 p-24">
      <h1 className="text-gray-800 text-4xl text-center font-bold mb-8">
        Message Board
      </h1>
      <section className="flex flex-col border-4 border-blue-500 rounded-md bg-gray-900 p-8 text-white">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-800 border-2 border-blue-500 rounded-md p-4 mb-16"
            >
              <header>
                <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              </header>
              <p className="text-sm">{post.content}</p>
              <p className="text-xs text-blue-500 mt-2">- {post.user.email}</p>
            </article>
          ))}
      </section>
    </main>
  );
}
