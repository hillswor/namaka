"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();

  const navStyling =
    "flex justify-between bg-gray-800 text-white py-6 px-4 border-b-4 border-blue-500";
  const ulStyling = "flex items-center space-x-6 text-lg";
  const linkStyling =
    "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer";
  const logoStyling =
    "hover:opacity-80 transition duration-200 ease-in-out cursor-pointer";

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setUser(null);
        router.push("/");
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
