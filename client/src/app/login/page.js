"use client";

import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <main className="flex flex-col border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-16 mb-16 bg-gray-800 text-white">
      <LoginForm />
    </main>
  );
}
