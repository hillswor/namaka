"use client";

import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <main
      className={
        "flex flex-col border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-16 mb-16 bg-gray-800 text-white"
      }
    >
      <SignupForm />
    </main>
  );
}
