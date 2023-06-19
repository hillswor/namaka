import Image from "next/image";

export default function navbar() {
  return (
    <nav className="flex justify-between bg-zinc-500 p-2">
      <Image
        src="/namaka-transparent.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
      />
      <ul className="flex items-end space-x-4 text-sky-100">
        <li>
          <a href="/" className="hover:text-red-500 active:text-red-500">
            Home
          </a>
        </li>
        <li>
          <a href="/Login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
