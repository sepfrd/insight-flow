import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UserBlogPosts from "./pages/UserBlogPosts";

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
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/my-blog-posts"
            element={<UserBlogPosts />}
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
