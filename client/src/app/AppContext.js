"use client";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);
export const AquariumContext = createContext(null);
export const PostsContext = createContext(null);

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [aquarium, setAquarium] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("/api/check-session", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AquariumContext.Provider value={{ aquarium, setAquarium }}>
        <PostsContext.Provider value={{ posts, setPosts }}>
          {children}
        </PostsContext.Provider>
      </AquariumContext.Provider>
    </UserContext.Provider>
  );
}
