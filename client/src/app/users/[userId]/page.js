"use client";

import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { UserContext, AquariumContext } from "../../AppContext";

const AquariumSchema = Yup.object().shape({
  brand: Yup.string().required("Required"),
  model: Yup.string().required("Required"),
  volume: Yup.number().required("Required"),
});

export default function UserPage() {
  const { user, setUser } = useContext(UserContext);
  const { setAquarium } = useContext(AquariumContext);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const formStyling =
    "flex flex-col items-center justify-center border-4 border-namaka-blue rounded-md max-w-xl m-auto p-8 mt-16";
  const labelStyling = "block text-zinc-500 text-lg mb-2";
  const inputStyling =
    "border-4 border-namaka-blue rounded-md px-4 py-2 mb-4 w-full";
  const buttonStyling =
    "bg-zinc-500 text-namaka-blue px-4 py-2 rounded-md hover:text-namaka-red transition-all duration-200 border-2 border-namaka-blue hover:border-namaka-red";
  const errorStyling = "bg-red-200 text-namaka-red p-2 mb-2 rounded";
  const aquariumStyling =
    "flex items-center space-x-4 border-2 border-gray-200 rounded-lg p-2 mt-4";

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

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8">Hello, {user.id}</h1>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className={`${buttonStyling} mt-4`}
        >
          Add Aquarium
        </button>
      )}
      {showForm && form}
      {user.aquariums.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Your Aquariums</h2>
          <ul className="list-inside">
            {user.aquariums.map((aquarium) => (
              <li key={aquarium.id} className={aquariumStyling}>
                <div className="flex-shrink-0">
                  <Image
                    src="/reef-tank.jpeg"
                    alt="Reef Tank"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div className="flex items-center">{aquarium.brand}</div>
                  <div className="flex items-center">{aquarium.model}</div>
                  <div className="flex items-center">
                    {aquarium.volume} gallons
                  </div>
                  <button
                    className={`${buttonStyling} mt-2`}
                    onClick={() =>
                      setAquarium(aquarium) &
                      router.push(`/users/${user.id}/aquariums/${aquarium.id}`)
                    }
                  >
                    View Aquarium
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg mt-8">You currently have no aquariums.</p>
      )}
    </div>
  );
}