import { authService } from "@/api/authService";
import "@/styles/authentication.css";
import { REGEX_PATTERNS } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Signup.module.css";
import { useLoading } from "@/hooks/useLoading";

const Signup = () => {
  const [signupViewModel, setSignupViewModel] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { setIsLoading } = useLoading();

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
    setResponse({});
    setIsLoading(true);
    event.preventDefault();

    const validationResult = validate(signupViewModel);

    if (validationResult !== true) {
      setResponse({ statusCode: 400, message: validationResult });
      setIsLoading(false);
      return;
    }

    let signupResponse = await authService.signupAsync({
      firstName: signupViewModel.firstName,
      lastName: signupViewModel.lastName,
      username: signupViewModel.username,
      password: signupViewModel.password,
      email: signupViewModel.email,
    });

    setIsLoading(false);

    if (signupResponse.isSuccess && signupResponse.data != null) {
      navigate("/login");
    }
  };

  useEffect(() => {
    userInfo?.length > 0 && navigate("/");
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
      <div className={styles.response}>
        <div className={`${styles.responseBody} ${styles[`responseBody${response.statusCode}`]}`}>
          <div> {response.message} </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
