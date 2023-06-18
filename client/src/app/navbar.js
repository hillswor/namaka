import Image from "next/image";

export default function navbar() {
  return (
    <nav className="flex bg-zinc-600 ">
      <div className="p-0 border-2 border-red-500">
        <Image
          src="/namaka-main-logo.svg"
          alt="Nakama Logo"
          width={140}
          height={140}
        />
      </div>
      <img src="/namaka-main-logo.svg" alt="Nakama Logo" />
      <ul className="flex text-sky-100">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
