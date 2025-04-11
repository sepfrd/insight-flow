import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import CreateBlogPost from "./pages/CreateBlogPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
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
          <Route
            path="/create-blog-post"
            element={<CreateBlogPost />}
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
