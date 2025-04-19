import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Uploader from "./components/Uploader";
import { AuthProvider } from "./contexts/AuthContext";
import { StorageProvider } from "./contexts/StorageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import CreateBlogPost from "./pages/CreateBlogPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import UserBlogPosts from "./pages/UserBlogPosts";
import GlobalToast from "./components/GlobalToast";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StorageProvider>
          <ToastProvider>
            <GlobalToast pauseOnFocusLoss={false} />
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
              <Route
                path="/uploader"
                element={<Uploader />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </ToastProvider>
        </StorageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
