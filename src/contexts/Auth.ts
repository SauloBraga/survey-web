import { ReactNode, createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false })

interface AuthenticationContextProviderProps {
  children: ReactNode
}

function AuthenticationContextProvider({ children }: AuthenticationContextProviderProps) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  async function checkUserAuthentication(){
    const token = localStorage.getItem('survey:user_token')

    if(!token)
      setIsAuthenticated(false);

    const payload = jwtDecode(token as string)

    console.log(payload)
  }

  // useEffect(() => {
  //   checkUserAuthentication()
  // },[])

}