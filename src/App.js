import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
