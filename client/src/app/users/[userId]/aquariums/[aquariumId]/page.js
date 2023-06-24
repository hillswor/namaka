"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { Formik } from "formik";
import { object, number } from "yup";

import { AquariumContext } from "../../../../AppContext";
import ParmatersForm from "./ParametersForm";

const ParameterSchema = object({
  ph: number().required("Required"),
  ammonia: number().required("Required"),
  nitrite: number().required("Required"),
  nitrate: number().required("Required"),
  phosphate: number().required("Required"),
  calcium: number().required("Required"),
  magnesium: number().required("Required"),
  alkalinity: number().required("Required"),
});

export default function AquariumPage() {
  const { aquarium } = useContext(AquariumContext);
  const [showForm, setShowForm] = useState(true);

  const sectionStyling = "flex flex-col  items-center justify-center";

  const buttonStyling =
    "bg-zinc-500 text-namaka-blue px-4 py-2 rounded-md hover:text-namaka-red transition-all duration-200 border-2 border-namaka-blue hover:border-namaka-red";

  return showForm ? (
    <ParmatersForm />
  ) : (
    <section className={sectionStyling}>
      <Image
        src="/reef-tank.jpeg"
        alt="Reef Tank"
        width={500}
        height={500}
        className="mt-5"
      />
      <h1>{aquarium.brand}</h1>
      <p>{aquarium.model}</p>
      <button className={buttonStyling}>Update Parameters</button>
    </section>
  );
}
