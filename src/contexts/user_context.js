import { createContext, useState, useContext } from "react";

const userContext = createContext();

export function useUser() {
  return useContext(userContext);
}

const UserContext = ({ children }) => {
  const user = useState();

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserContext;
