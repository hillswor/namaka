import Image from "next/image";

export default function Home() {
  return (
    <main className="px-36 py-24">
      <section className="flex flex-col items-center bg-slate-500 p-8 rounded-lg shadow-2xl text-white">
        <h1 className="flex flex-shrink text-center text-6xl font-bold mt-6">
          Welcome to NĀMAKA
        </h1>
        <p className="flex mt-8 text-center">
          Namaka is more than just an application - it's an intuitive,
          comprehensive companion dedicated to helping you nurture and enjoy
          your own slice of the sea. Named after the goddess of the sea, Namaka
          brings you closer to the enchanting universe beneath the waves, right
          at your fingertips.
        </p>
        <p className="flex mt-4 text-center">
          With Namaka, you can easily track and manage all aspects of your
          saltwater aquariums. Our sophisticated yet user-friendly platform
          enables you to monitor various parameters crucial to maintaining a
          healthy aquatic environment, including temperature, pH, salinity, and
          much more. Each aquarium gets its dedicated dashboard, where you can
          log information, analyze trends, and optimize care routines.
        </p>
        <p className="flex mt-4 text-center">
          Moreover, Namaka is home to a thriving community of passionate
          aquarists and marine life enthusiasts. Our interactive message board
          allows you to ask questions, share your experiences, offer advice, or
          simply engage in captivating discussions about the mesmerizing marine
          world.
        </p>
        <p className="flex mt-4 text-center">
          But that's not all! To access these fantastic features, all you need
          to do is sign up and log in. Once you're part of the Namaka family,
          you can enjoy an all-encompassing, dynamic, and supportive environment
          that amplifies your marine adventures.
        </p>
        <p className="flex mt-4 text-center">
          Embark on your exciting journey with Namaka today. Dive in, explore,
          and let the sea enchant you, right in the comfort of your home!
        </p>
        <p className="flex mt-4 text-center">Welcome aboard!</p>
        <Image
          src="/namaka-logo.svg"
          alt="Namaka Logo"
          width={150}
          height={150}
          className="flex mt-4"
        />
      </section>
    </main>
  );
}
