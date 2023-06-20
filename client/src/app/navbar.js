"use client";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState(false);

  const navStyling = "flex justify-between bg-zinc-500 border-b-4";
  const ulStyling = "flex items-end space-x-6 text-namaka-blue text-lg pr-6";
  const linkStyling = "hover:text-namaka-red active:text-namaka-red";
  const logoStyling = "hover:opacity-50 active:opacity-50 cursor-pointer pl-2";

  return active ? (
    <nav className={navStyling}>
      <Image
        src="/namaka-transparent.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className={logoStyling}
      />
      <ul className={ulStyling}>
        <li>
          <a href="/myaccount" className={linkStyling}>
            My Account
          </a>
        </li>
        <li>
          <a href="/messageboard" className={linkStyling}>
            Message Board
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className={navStyling}>
      <Image
        src="/namaka-transparent.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className={logoStyling}
      />
      <ul className={ulStyling}>
        <li>
          <a href="/myaccount" className={linkStyling}>
            Login
          </a>
        </li>
        <li>
          <a href="/messageboard" className={linkStyling}>
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
}
