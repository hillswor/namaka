"use client";

import { createContext } from "react";

export const UserContext = createContext(null);

import { useState } from "react";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
