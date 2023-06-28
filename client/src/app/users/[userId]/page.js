"use client";

import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { UserContext, AquariumContext } from "../../AppContext";

export default function UserPage() {
  const { user, setUser } = useContext(UserContext);
  const { setAquarium } = useContext(AquariumContext);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const formStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-8 bg-gray-800 text-white";
  const labelStyling = "block text-blue-400 text-lg mb-2";
  const inputStyling =
    "border-4 border-blue-500 rounded-md px-4 py-2 mb-4 w-full text-gray-800";
  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-md hover:text-gray-800 transition-all duration-200 border-2 border-white hover:border-gray-800";
  const backButtonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-md hover:text-gray-800 transition-all duration-200 border-2 border-white hover:border-gray-800 mt-2";
  const errorStyling = "bg-red-600 text-white p-2 mb-2 rounded";
  const imgStyling =
    "rounded-lg shadow-lg transform transition duration-500 hover:scale-105";
  const mainStyling =
    "flex flex-col items-center justify-center border-4 border-blue-500 rounded-md max-w-xl m-auto p-8 mt-16 mb-16 bg-gray-800 text-white";
  const aquariumStyling =
    "flex items-center space-x-4 border-2 border-blue-500 rounded-lg p-2 mt-4 bg-gray-200 text-blue-500";

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

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className={mainStyling}>
      <h1 className={"text-3xl font-bold mt-8 mb-6"}>
        Hello, {user.first_name}
      </h1>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className={
            "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200"
          }
        >
          Add Aquarium
        </button>
      )}
      {!showForm ? (
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-6 text-center">
            Your Aquariums
          </h2>
          {user.aquariums.length > 0 ? (
            <ul>
              {user.aquariums.map((aquarium) => (
                <li key={aquarium.id} className={aquariumStyling}>
                  <figure className="flex-shrink-0">
                    <Image
                      src="/reef-tank.jpeg"
                      alt="Reef Tank"
                      width={100}
                      height={100}
                      className={imgStyling}
                    />
                  </figure>
                  <article>
                    <p className={"flex items-center text-gray-800 mb-2"}>
                      {aquarium.brand}
                    </p>
                    <p className={"flex items-center text-gray-800 mb-2"}>
                      {aquarium.model}
                    </p>
                    <p className={"flex items-center text-gray-800 mb-2"}>
                      {aquarium.volume} gallons
                    </p>
                    <button
                      className={
                        "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200"
                      }
                      onClick={() =>
                        setAquarium(aquarium) &
                        router.push(
                          `/users/${user.id}/aquariums/${aquarium.id}`
                        )
                      }
                    >
                      View Aquarium
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg mt-8">You currently have no aquariums.</p>
          )}
          {user.shared_aquariums.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-2 mt-6 text-center">
                Aquariums Shared With You
              </h2>
              <ul>
                {user.shared_aquariums.map((sharedAquarium) => (
                  <li key={sharedAquarium.id} className={aquariumStyling}>
                    <figure className="flex-shrink-0">
                      <Image
                        src="/reef-tank.jpeg"
                        alt="Reef Tank"
                        width={100}
                        height={100}
                        className={imgStyling}
                      />
                    </figure>
                    <article>
                      <p className={"flex items-center text-gray-800 mb-2"}>
                        {sharedAquarium.aquarium.brand}
                      </p>
                      <p className={"flex items-center text-gray-800 mb-2"}>
                        {sharedAquarium.aquarium.model}
                      </p>
                      <p className={"flex items-center text-gray-800 mb-2"}>
                        {sharedAquarium.aquarium.volume} gallons
                      </p>
                      <button
                        className={
                          "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200"
                        }
                        onClick={() =>
                          setAquarium(sharedAquarium.aquarium) &
                          router.push(
                            `/users/${user.id}/aquariums/${sharedAquarium.aquarium.id}`
                          )
                        }
                      >
                        View Aquarium
                      </button>
                    </article>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        renderForm()
      )}
    </main>
  );
}
