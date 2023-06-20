import Image from "next/image";

export default function navbar() {
  return (
    <nav className="flex justify-between bg-namaka-gray border-b-4 border-namaka-red p-2">
      <Image
        src="/namaka-transparent.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className="hover:opacity-50 active:opacity-50 cursor-pointer"
      />
      <ul className="flex items-end space-x-4 text-namaka-blue text-lg">
        <li>
          <a href="/" className="hover:text-namaka-red active:text-namaka-red">
            Home
          </a>
        </li>
        <li>
          <a
            href="/Login"
            className="hover:text-namaka-red active:text-namaka-red"
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="/Register"
            className="hover:text-namaka-red active:text-namaka-red"
          >
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
}
