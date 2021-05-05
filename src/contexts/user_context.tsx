import { createContext, useState, useContext } from "react";

const userContext = createContext(undefined);

export function useUser() {
  return useContext(userContext);
}

const UserContext = ({ children }:{children:any}) => {
  const [user,setUser] = useState();
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserContext;
