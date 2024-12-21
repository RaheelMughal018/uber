import { createContext, useState } from "react";

export const userDataContext = createContext();
export default function UserContext({ children }) {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });
  return (
    <userDataContext.Provider value={user}>{children}</userDataContext.Provider>
  );
}
