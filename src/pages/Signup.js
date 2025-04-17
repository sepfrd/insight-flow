import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/authService";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/authentication.css";
import { REGEX_PATTERNS } from "../utils/constants";

export default function Signup() {
  const [signupViewModel, setSignupViewModel] = useState({
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

  const handleChange = (e) => {
    setSignupViewModel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  useEffect(() => {
    userInfo && navigate("/");
  }, [navigate, userInfo]);

  return (
    <>
      <div className="auth-form">
        <form
          id="signupForm"
          className="auth-from__form"
          onSubmit={handleSubmit}>
          <div className="auth-form__item">
            <label
              htmlFor="firstName"
              className="auth-form__label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="auth-form__text-field"
              value={signupViewModel.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form__item">
            <label
              htmlFor="lastName"
              className="auth-form__label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="auth-form__text-field"
              value={signupViewModel.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form__item">
            <label
              htmlFor="username"
              className="auth-form__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="auth-form__text-field"
              value={signupViewModel.username}
              onChange={handleChange}
            />
          </div>

          <div className="auth-form__item">
            <label
              htmlFor="email"
              className="auth-form__label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="auth-form__text-field"
              value={signupViewModel.email}
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
              value={signupViewModel.password}
              onChange={handleChange}
            />
          </div>
          <div className="auth-form__item">
            <label
              htmlFor="confirmPassword"
              className="auth-form__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="auth-form__text-field"
              value={signupViewModel.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="auth-form__button">
            Signup
          </button>
        </form>
      </div>
      <div className="response">
        <div className={`response__body response__body--${response.statusCode}`}>
          <div> {response.message} </div>
        </div>
      </div>
    </>
  );
}
