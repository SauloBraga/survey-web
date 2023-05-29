import { ReactNode, createContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
  isAuthenticated: boolean
  handleLogin: (document: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  isAuthenticated: false, 
  handleLogin: async (document: string, password: string) => {}, 
  handleLogout: () => {} 
})

interface AuthenticationContextProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthenticationContextProviderProps) {
  const {isAuthenticated, handleLogin, handleLogout} = useAuth()


  return (
    <AuthContext.Provider value={{isAuthenticated, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}