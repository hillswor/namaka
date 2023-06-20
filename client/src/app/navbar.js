"use client";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState(false);

  return active ? (
    <nav className="flex justify-between bg-zinc-400 border-b-4">
      <Image
        src="/namaka-transparent.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className="hover:opacity-50 active:opacity-50 cursor-pointer pl-2"
      />
      <ul className="flex items-end space-x-6 text-namaka-blue text-lg pr-6">
        <li>
          <a
            href="/myaccount"
            className="hover:text-namaka-red active:text-namaka-red"
          >
            My Account
          </a>
        </li>
        <li>
          <a
            href="/messageboard"
            className="hover:text-namaka-red active:text-namaka-red"
          >
            Message Board
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="flex justify-between bg-zinc-400 border-b-4">
      <Image
        src="/namaka-transparent.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className="hover:opacity-50 active:opacity-50 cursor-pointer pl-2"
      />
      <ul className="flex items-end space-x-6 text-namaka-blue text-lg pr-6">
        <li>
          <a
            href="/myaccount"
            className="hover:text-namaka-red active:text-namaka-red"
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="/messageboard"
            className="hover:text-namaka-red active:text-namaka-red"
          >
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
}
