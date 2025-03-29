import { useContext, useState } from "react";
import "../styles/authentication.css";
import { authService } from "../api/authService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginViewModel, setLoginViewModel] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState({});
  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let loginResponse = await authService.loginAsync(loginViewModel);

    setResponse(loginResponse);

    if (loginResponse.isSuccess && loginResponse.data != null) {
      onLogin(loginResponse.data);
      navigate("/");
    }
  };

  return (
    <>
      <div className="login-form-div">
        <form
          id="login-form"
          className="form"
          onSubmit={handleSubmit}>
          <div className="username">
            <label
              htmlFor="usernameOrEmail"
              className="login-label">
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              required
              className="login-text-field"
              value={loginViewModel.username}
              onChange={(event) =>
                setLoginViewModel({
                  ...loginViewModel,
                  username: event.target.value,
                })
              }
            />
          </div>
          <div className="password">
            <label
              htmlFor="password"
              className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="login-text-field"
              value={loginViewModel.password}
              onChange={(event) =>
                setLoginViewModel({
                  ...loginViewModel,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className="remember-me">
            <label
              htmlFor="rememberMe"
              className="login-label">
              Keep me logged in
            </label>
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="remember-me-checkbox"
              checked={loginViewModel.rememberMe}
              onChange={(event) => {
                setLoginViewModel({
                  ...loginViewModel,
                  rememberMe: event.target.checked,
                });
              }}
            />
          </div>
          <button
            type="submit"
            className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="response-section">
        <div className={`response response-${response.HttpStatusCode}`}>
          <div> {response.Message} </div>
        </div>
      </div>
    </>
  );
}
