"use client";

import { useContext, useState } from "react";
import Image from "next/image";

import { AquariumContext } from "../../../../AppContext";
import ParmatersForm from "./ParametersForm";

export default function AquariumPage() {
  const { aquarium } = useContext(AquariumContext);
  const [showForm, setShowForm] = useState(false);

  const sectionStyling = "flex flex-col  items-center justify-center";

  const buttonStyling =
    "bg-zinc-500 text-namaka-blue px-4 py-2 rounded-md hover:text-namaka-red transition-all duration-200 border-2 border-namaka-blue hover:border-namaka-red";

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  return showForm ? (
    <ParmatersForm toggleShowForm={toggleShowForm} aquarium={aquarium} />
  ) : (
    <section className={sectionStyling}>
      <Image
        src="/reef-tank.jpeg"
        alt="Reef Tank"
        width={500}
        height={500}
        className="mt-5"
      />
      <h1>{aquarium ? aquarium.brand : "Loading..."}</h1>
      <p>{aquarium ? aquarium.model : "Loading..."}</p>
      <button onClick={toggleShowForm} className={buttonStyling}>
        Update Parameters
      </button>
    </section>
  );
}
