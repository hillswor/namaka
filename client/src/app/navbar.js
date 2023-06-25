"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const navStyling = "flex justify-between bg-zinc-500 border-b-4";
  const ulStyling = "flex items-end space-x-6 text-namaka-blue text-lg pr-6";
  const linkStyling =
    "hover:text-namaka-red active:text-namaka-red cursor-pointer";
  const logoStyling = "hover:opacity-50 active:opacity-50 cursor-pointer pl-2";

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setUser(null);
      } else {
        throw new Error("Unable to logout");
      }
    });
  };

  return user ? (
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
          <Link href={`/users/${user.id}`} className={linkStyling}>
            My Account
          </Link>
        </li>
        <li>
          <Link href="/messageboard" className={linkStyling}>
            Message Board
          </Link>
        </li>
        <li onClick={handleLogout} className={linkStyling}>
          Logout
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
