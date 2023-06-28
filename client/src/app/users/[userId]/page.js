"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { UserContext, AquariumContext } from "../../AppContext";
import AddAquariumForm from "./AddAquariumForm";
import EditAquariumForm from "./EditAquariumForm";

export default function UserPage() {
  const { user } = useContext(UserContext);
  const { setAquarium } = useContext(AquariumContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAquarium, setSelectedAquarium] = useState(null); // Add selectedAquarium state
  const router = useRouter();

  function toggleAddForm() {
    setShowAddForm(!showAddForm);
  }

  function toggleEditForm(aquarium) {
    setSelectedAquarium(aquarium);
    setShowEditForm(!showEditForm);
  }

  if (showAddForm) {
    return <AddAquariumForm toggleAddForm={toggleAddForm} />;
  }

  if (showEditForm) {
    return (
      <EditAquariumForm
        toggleEditForm={toggleEditForm}
        aquarium={selectedAquarium}
      />
    );
  }

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
    "flex items-center justify-between space-x-4 border-2 border-blue-500 rounded-lg p-2 mt-4 bg-gray-200 text-blue-500";

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (showAddForm) {
    return <AddAquariumForm toggleAddForm={toggleAddForm} />;
  }

  if (showEditForm) {
    return (
      <EditAquariumForm
        toggleEditForm={toggleEditForm}
        selectedAquarium={selectedAquarium}
      />
    );
  }

  return (
    <main className={mainStyling}>
      <h1 className={"text-3xl font-bold mt-8 mb-6"}>
        Hello, {user.first_name}
      </h1>
      <button
        onClick={toggleAddForm}
        className={
          "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200"
        }
      >
        Add Aquarium
      </button>
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
                  <div className="flex">
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
                      View
                    </button>
                    <button
                      className={
                        "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 ml-2"
                      }
                      onClick={() => {
                        toggleEditForm(aquarium);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={
                        "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 ml-2"
                      }
                      onClick={() =>
                        console.log(`Delete aquarium with ID ${aquarium.id}`)
                      }
                    >
                      Delete
                    </button>
                  </div>
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
    </main>
  );
}
