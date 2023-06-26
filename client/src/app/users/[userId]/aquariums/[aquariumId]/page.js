"use client";

import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AquariumContext } from "../../../../AppContext";
import ParmatersForm from "./ParametersForm";
import ParametersChart from "./ParametersChart";

export default function AquariumPage() {
  const { aquarium } = useContext(AquariumContext);
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const sectionStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-16 bg-gray-800 text-white";
  const imgStyling =
    "rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mt-5 mb-3 border-2 border-blue-500";
  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-md hover:text-gray-800 transition-all duration-200 border-2 border-white hover:border-gray-800";
  const formStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-8 bg-gray-800 text-white";
  const labelStyling = "block text-blue-400 text-lg mb-2";
  const inputStyling =
    "border-4 border-blue-500 rounded-md px-4 py-2 mb-4 w-full text-gray-800";
  const backButtonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-md hover:text-gray-800 transition-all duration-200 border-2 border-white hover:border-gray-800 mt-2";
  const errorStyling = "bg-red-600 text-white p-2 mb-2 rounded";
  const mainStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-16 bg-gray-800 text-white";
  const userHeaderStyling = "text-3xl font-bold mt-8 mb-4 text-center";
  const aquariumStyling =
    "flex items-center space-x-4 border-2 border-blue-500 rounded-lg p-2 mt-4 bg-gray-200 text-blue-500";
  const brandModelVolumeStyling = "flex items-center";
  const aquariumButtonStyling =
    "bg-gray-800 text-white px-4 py-2 rounded-md hover:text-blue-500 transition-all duration-200 border-2 border-blue-500 hover:border-gray-200";

  const AquariumSchema = Yup.object().shape({
    brand: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    volume: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      brand: "",
      model: "",
      volume: "",
    },
    validationSchema: AquariumSchema,
    onSubmit: (values, { resetForm }) => {
      values.owner_id = user.id;
      fetch("/api/aquariums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedUser = { ...user, aquariums: [...user.aquariums, data] };
          setUser(updatedUser);
        });
      resetForm();
      setShowForm(false);
    },
  });

  const renderForm = () => (
    <>
      <button onClick={() => setShowForm(false)} className={backButtonStyling}>
        Back
      </button>
      <form onSubmit={formik.handleSubmit} className={formStyling}>
        <label htmlFor="brand" className={labelStyling}>
          Brand
        </label>
        <input
          id="brand"
          name="brand"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.brand}
          className={inputStyling}
        />
        {formik.errors.brand && formik.touched.brand ? (
          <div className={errorStyling}>{formik.errors.brand}</div>
        ) : null}

        <label htmlFor="model" className={labelStyling}>
          Model
        </label>
        <input
          id="model"
          name="model"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.model}
          className={inputStyling}
        />
        {formik.errors.model && formik.touched.model ? (
          <div className={errorStyling}>{formik.errors.model}</div>
        ) : null}

        <label htmlFor="volume" className={labelStyling}>
          Volume
        </label>
        <input
          id="volume"
          name="volume"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.volume}
          placeholder="in gallons"
          className={inputStyling}
        />
        {formik.errors.volume && formik.touched.volume ? (
          <div className={errorStyling}>{formik.errors.volume}</div>
        ) : null}

        <button type="submit" className={buttonStyling}>
          Submit
        </button>
      </form>
    </>
  );

  return showForm ? (
    <ParmatersForm toggleShowForm={toggleShowForm} aquarium={aquarium} />
  ) : (
    <main className={mainStyling}>
      <Image
        src="/reef-tank.jpeg"
        alt="Reef Tank"
        width={500}
        height={500}
        className={imgStyling}
      />
      <h1>{aquarium.brand}</h1>
      <p>{aquarium.model}</p>
      <button onClick={toggleShowForm} className={buttonStyling}>
        Update Parameters
      </button>
      <ParametersChart aquarium={aquarium} />
    </main>
  );
}
