"use client";

import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { UserContext } from "../../UserContext";

const AquariumSchema = Yup.object().shape({
  brand: Yup.string().required("Required"),
  model: Yup.string().required("Required"),
  volume: Yup.number().required("Required"),
});

export default function UserPage() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      brand: "",
      model: "",
      volume: "",
    },
    validationSchema: AquariumSchema,
    onSubmit: (values, { resetForm }) => {
      values.owner_id = user.id;
      fetch("http://127.0.0.1:5555/aquariums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      resetForm();
      setShowForm(false);
    },
  });

  const formStyling =
    "flex flex-col items-center justify-center border-4 border-namaka-blue rounded-md max-w-xl m-auto p-8 mt-16";
  const labelStyling = "block text-zinc-500 text-lg mb-2";
  const inputStyling =
    "border-4 border-namaka-blue rounded-md px-4 py-2 mb-4 w-full";
  const buttonStyling =
    "bg-zinc-500 text-namaka-blue px-4 py-2 rounded-md hover:text-namaka-red transition-all duration-200 border-2 border-namaka-blue hover:border-namaka-red";
  const errorStyling = "bg-red-200 text-namaka-red p-2 mb-2 rounded";

  const form = (
    <>
      <button onClick={() => setShowForm(false)} className={buttonStyling}>
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

  return user ? (
    <div>
      {!showForm && <h1>Hello, {user.id}</h1>}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className={buttonStyling}>
          Add Aquarium
        </button>
      )}
      {showForm && form}
    </div>
  ) : (
    router.push("/")
  );
}
