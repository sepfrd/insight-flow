import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
