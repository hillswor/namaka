"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();

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
    <nav
      className={
        "flex justify-between bg-gray-800 text-white py-2 px-4 border-b-4 border-blue-500"
      }
    >
      <Image
        src="/namaka-logo.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        priority={true}
        placeholder="blur"
        blurDataURL="/namaka-transparent.svg"
      />
      <ul className={"flex items-end space-x-6 text-lg"}>
        <li>
          <Link
            href="/"
            className={
              "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={`/users/${user.id}`}
            className={
              "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
            }
          >
            My Account
          </Link>
        </li>
        <li>
          <Link
            href="/posts"
            className={
              "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
            }
          >
            Message Board
          </Link>
        </li>
        <li
          onClick={handleLogout}
          className={
            "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
          }
        >
          Logout
        </li>
      </ul>
    </nav>
  ) : (
    <nav
      className={
        "flex justify-between bg-gray-800 text-white py-6 px-4 border-b-4 border-blue-500"
      }
    >
      <Image
        src="/namaka-logo.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className={
          "hover:opacity-80 transition duration-200 ease-in-out cursor-pointer"
        }
      />
      <ul className={"flex items-center space-x-6 text-lg"}>
        <li>
          <Link
            href="/login"
            className={
              "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
            }
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className={
              "hover:text-blue-400 transition duration-200 ease-in-out cursor-pointer"
            }
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
