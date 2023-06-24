"use client";

import { useContext } from "react";

import { AquariumContext } from "../../../../AppContext";

export default function AquariumPage() {
  const { aquarium } = useContext(AquariumContext);

  const handleClick = (aquarium) => {
    console.log(aquarium);
  };

  return (
    <div>
      <h1 onClick={handleClick}>Hello {aquarium.id} </h1>
    </div>
  );
}
