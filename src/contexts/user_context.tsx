import {createContext, useState, useContext, useEffect, useRef} from "react";
import UserInterface from "../interfaces/user_interface";
import {ApolloConsumer, useLazyQuery, useQuery} from "@apollo/client";
import {GYM_LIST_ALL} from "../graphqlQueries/gymQueries";
import {GET_USER_BY_EMAIL} from "../graphqlQueries/userQueries";

const userContext = createContext<UserInterface | undefined | null>(null);
const setUserContext = createContext<any>(undefined);
const clientContext = createContext<any>(undefined);

export function useUser() {
    return useContext(userContext);
}

export function useSetUser() {
    return useContext(setUserContext);
}
export function useClient(){
    return useContext(clientContext);
}

const UserContext = ({children, client}: { children: any, client: any }) => {
    const [user, setUser] = useState<UserInterface | undefined | null>(null);

    function setUserData(user: UserInterface | undefined) {
        if (user) localStorage.setItem("user", user.email);
        else localStorage.removeItem("user");
        setUser(user);
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser && loggedInUser !== 'undefined') {
            client.query({query: GET_USER_BY_EMAIL, variables: {email: loggedInUser}}).then((result: any) => {
                if(result.data.user) setUser(result.data.user)
                else {
                    localStorage.removeItem("user");
                    setUser(undefined);
                }
            }).catch(() => {
                localStorage.removeItem("user");
                setUser(undefined);
            })
        } else setUser(undefined)
    }, [])
    return <userContext.Provider value={user}>
        <setUserContext.Provider value={setUserData}>
            <clientContext.Provider value={client}>
                {children}

            </clientContext.Provider>
        </setUserContext.Provider>
    </userContext.Provider>;
};

export default UserContext;
