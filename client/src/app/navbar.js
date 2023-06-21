"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check-session")
      .then((response) => {
        if (response.status === 200) {
          setActive(true);
          console.log("active");
        } else {
          setActive(false);
          console.log("inactive");
          throw new Error("Not logged in");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navStyling = "flex justify-between bg-zinc-500 border-b-4";
  const ulStyling = "flex items-end space-x-6 text-namaka-blue text-lg pr-6";
  const linkStyling = "hover:text-namaka-red active:text-namaka-red";
  const logoStyling = "hover:opacity-50 active:opacity-50 cursor-pointer pl-2";

  return active ? (
    <nav className={navStyling}>
      <Link href="/">
        <Image
          src="/namaka-transparent.svg"
          alt="Nakama Logo"
          width={100}
          height={100}
          className={logoStyling}
          priority={true}
          placeholder="blur"
          blurDataURL="/namaka-transparent.svg"
        />
      </Link>
      <ul className={ulStyling}>
        <li>
          <Link href="/myaccount" className={linkStyling}>
            My Account
          </Link>
        </li>
        <li>
          <Link href="/messageboard" className={linkStyling}>
            Message Board
          </Link>
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
          <Link href="/login" className={linkStyling}>
            Login
          </Link>
        </li>
        <li>
          <Link href="/signup" className={linkStyling}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
