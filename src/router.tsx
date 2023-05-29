import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { NewSurvey } from "./pages/NewSurvey";
import { Login } from "./pages/Login";

interface PrivateRouteProps {
  children: JSX.Element
}

function PrivateRoute({ children }:PrivateRouteProps) {
  const isAuthenticated = false
  return isAuthenticated ? (children) : <Navigate to="/login" />
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={ <DefaultLayout/> } >
        <Route path="/" element={ <Home/> } />
        <Route path="/new" element={ 
          <PrivateRoute>
            <NewSurvey/>
          </PrivateRoute>
        } />
        <Route path="/login" element={ <Login/> } />
      </Route>
    </Routes>
  )
}