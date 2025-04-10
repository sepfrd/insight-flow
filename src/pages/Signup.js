import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/authentication.css";
import { REGEX_PATTERNS } from "../utils/constants";

export default function Signup() {
  const [signupViewModel, setLoginViewModel] = useState({
    username: "test_user",
    password: "Correct_p0",
    confirmPassword: "Correct_p0",
    email: "test@user.com",
    firstName: "test",
    lastName: "user",
  });
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const validate = (model) => {
    if (!new RegExp(REGEX_PATTERNS.username).test(model.username)) {
      return "Invalid username format.";
    }

    if (!new RegExp(REGEX_PATTERNS.email).test(model.email)) {
      return "Invalid email format.";
    }

    if (!new RegExp(REGEX_PATTERNS.password).test(model.password)) {
      return "Invalid password format.";
    }

    if (model.password !== model.confirmPassword) {
      return "Passwords do not match.";
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationResult = validate(signupViewModel);

    if (validationResult !== true) {
      setResponse({ statusCode: 400, message: validationResult });
      return;
    }

    let signupResponse = await authService.signupAsync({
      firstName: signupViewModel.firstName,
      lastName: signupViewModel.lastName,
      username: signupViewModel.username,
      password: signupViewModel.password,
      email: signupViewModel.email,
    });

    setResponse(signupResponse);

    if (signupResponse.isSuccess && signupResponse.data != null) {
      navigate("/login");
    }
  };

  return (
    <>
      {userInfo && navigate("/")}
      <div className="signup-form-div">
        <form
          id="signup-form"
          className="form"
          onSubmit={handleSubmit}>
          <div className="username">
            <label
              htmlFor="first-name"
              className="login-label">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              required
              className="form-text-field"
              value={signupViewModel.firstName}
              onChange={(event) =>
                setLoginViewModel({
                  ...signupViewModel,
                  firstName: event.target.value,
                })
              }
            />
          </div>
          <div className="username">
            <label
              htmlFor="last-name"
              className="login-label">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              required
              className="form-text-field"
              value={signupViewModel.lastName}
              onChange={(event) =>
                setLoginViewModel({
                  ...signupViewModel,
                  lastName: event.target.value,
                })
              }
            />
          </div>
          <div className="username">
            <label
              htmlFor="username"
              className="login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="form-text-field"
              value={signupViewModel.username}
              onChange={(event) =>
                setLoginViewModel({
                  ...signupViewModel,
                  username: event.target.value,
                })
              }
            />
          </div>

          <div className="username">
            <label
              htmlFor="email"
              className="login-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="form-text-field"
              value={signupViewModel.email}
              onChange={(event) =>
                setLoginViewModel({
                  ...signupViewModel,
                  email: event.target.value,
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
              className="form-text-field"
              value={signupViewModel.password}
              onChange={(event) =>
                setLoginViewModel({
                  ...signupViewModel,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className="confirm-password">
            <label
              htmlFor="confirm-password"
              className="login-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              className="form-text-field"
              value={signupViewModel.confirmPassword}
              onChange={(event) =>
                setLoginViewModel({
                  ...signupViewModel,
                  confirmPassword: event.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="form-button">
            Signup
          </button>
        </form>
      </div>
      <div className="response-section">
        <div className={`response response-${response.statusCode}`}>
          <div> {response.message} </div>
        </div>
      </div>
    </>
  );
}
