"use client";

import { useContext, useState } from "react";

import { PostsContext, PostContext } from "../AppContext";
import CommentForm from "./CommentForm";

export default function Posts() {
  const [commentForm, setCommentForm] = useState(false);
  const { posts } = useContext(PostsContext);
  const { setPost } = useContext(PostContext);

  //   functions

  const toggleCommentForm = () => {
    setCommentForm(!commentForm);
  };

  const handleReplyClick = (post) => {
    setPost(post);
    toggleCommentForm();
  };

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
              <header className="mb-4">
                <h2 className="text-xl font-bold">{post.title}</h2>
              </header>
              <p className="text-sm">{post.content}</p>
              <footer className="mt-4 text-xs">
                <p className="text-gray-400">
                  Posted by {post.user.email} on{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </footer>
              <button
                onClick={() => handleReplyClick(post)}
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 mt-4 transition-all duration-200"
              >
                Reply
              </button>
              <header className="mb-2 mt-8">
                <h2 className="text-l font-bold">Comments</h2>
              </header>
              {post.comments && post.comments.length > 0 && (
                <div className="mt-4 bg-gray-200 px-2 py-4 rounded-md text-blue-500">
                  <ul>
                    {post.comments.map((comment) => (
                      <li key={comment.id} className="text-sm">
                        <p>{comment.content}</p>
                        <p className="text-gray-400 text-xs mt-4">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
      </section>
    </main>
  );
}
