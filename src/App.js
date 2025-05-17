import GlobalToast from "@/components/GlobalToast";
import NavigationBar from "@/components/NavigationBar";
import Uploader from "@/components/Uploader";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NewBlogPost from "@/pages/NewBlogPost";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Signup from "@/pages/Signup";
import UserBlogPosts from "@/pages/UserBlogPosts";
import { AuthProvider } from "@/providers/AuthProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { StorageProvider } from "@/providers/StorageProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StorageProvider>
          <LoadingProvider>
            <ToastProvider>
              <GlobalToast
                pauseOnFocusLoss={false}
                autoClose={2500}
                position="bottom-left"
              />
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
                  element={<NewBlogPost />}
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
          </LoadingProvider>
        </StorageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
