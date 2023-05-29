import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('')
  const navigate= useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  
  useEffect(() => {
    const token = localStorage.getItem('survey:user_token');

    if(token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setIsAuthenticated(true);
      
      const decodedToken: { sub: string, iat: number } = jwtDecode(token)
      setUser(decodedToken.sub)
    }
  }, [])

  async function handleLogin(document: string, password: string) {
    const { data: { access_token } } = await api.post('auth/login', {document, password});

    localStorage.setItem('survey:user_token', JSON.stringify(access_token))
    api.defaults.headers.Authorization = `Bearer ${access_token}`
    setIsAuthenticated(true);
    navigate(from, { replace: true })
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem('survey:user_token')
    api.defaults.headers.Authorization = null
  }

  return { user, isAuthenticated, handleLogin, handleLogout }
}