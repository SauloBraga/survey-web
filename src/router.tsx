import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { NewSurvey } from "./pages/NewSurvey";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth";
import { AnswerSurvey } from "./pages/Answer";

interface RequireAuthProps {
  children: JSX.Element
}

function RequireAuth({children}: RequireAuthProps) {
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()
  if(!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }

  return children
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={ <DefaultLayout/> } >
        <Route path="/" element={ <Home/> } />
        <Route path="/new" element={
          <RequireAuth>
            <NewSurvey/>
          </RequireAuth>} 
        />
        <Route path="/answer" element={
          <RequireAuth>
            <AnswerSurvey/>
          </RequireAuth>} 
        />
        <Route path="/login" element={ <Login/> } />
      </Route>
    </Routes>
  )
}