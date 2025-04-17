import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/authentication.css";
import { userService } from "../api/userService";
import { storageService } from "../api/storageService";

export default function Login() {
  const [loginViewModel, setLoginViewModel] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [response, setResponse] = useState({});
  const { userInfo, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginViewModel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchAndStoreProfileImageAsync = async () => {
    const profileImage = await userService.getUserProfileImageAsync();
    await storageService.storeProfileImageAsync(profileImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let loginResponse = await authService.loginAsync(loginViewModel);

    setResponse(loginResponse);

    if (loginResponse.isSuccess && loginResponse.data != null) {
      onLogin(loginResponse.data);

      await fetchAndStoreProfileImageAsync();

      navigate("/");
    }
  };

  useEffect(() => {
    userInfo && navigate("/");
  }, [navigate, userInfo]);

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
      <div className="response">
        <div className={`response__body response__body--${response.HttpStatusCode}`}>
          <div> {response.Message} </div>
        </div>
      </div>
    </>
  );
}
