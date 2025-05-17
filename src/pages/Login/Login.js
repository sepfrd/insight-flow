import { authService } from "@/api/authService";
import { useAuth } from "@/hooks/useAuth";
import { useLoading } from "@/hooks/useLoading";
import "@/styles/authentication.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginViewModel, setLoginViewModel] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const { isAuthLoaded, isAuthenticated, onLogin } = useAuth();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const handleChange = (e) => {
    setLoginViewModel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);

    event.preventDefault();

    let loginResponse = await authService.loginAsync(loginViewModel);

    setIsLoading(false);

    if (loginResponse.isSuccess && loginResponse.data != null) {
      await onLogin(loginResponse.data);
      navigate("/");
    }
  };

  useEffect(() => {
    if (isAuthLoaded && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthLoaded, isAuthenticated, navigate]);

  return (
    <>
      <div className="auth-form">
        <form
          id="loginForm"
          className="auth-from__form"
          onSubmit={handleSubmit}>
          <div className="auth-form__item">
            <label
              htmlFor="usernameOrEmail"
              className="auth-form__label">
              Username Or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              required
              className="auth-form__text-field"
              value={loginViewModel.usernameOrEmail}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form__item">
            <label
              htmlFor="password"
              className="auth-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="auth-form__text-field"
              value={loginViewModel.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="auth-form__button">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
