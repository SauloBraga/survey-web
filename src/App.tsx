import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { AuthProvider } from "./contexts/Auth";

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Router/>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
