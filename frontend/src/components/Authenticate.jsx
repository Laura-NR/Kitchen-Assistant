import React, { useState } from "react";
import { loginUser } from "../API/user-manager";

export default function Authenticate({
  onAuthenticatedChanged,
  switchToRegister,
  loginMessage,
  loginMessageType
}) {
  const [error, setError] = useState('');

  async function onLoginFormSubmitHAndler(e) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const data = await loginUser(payload);
      const jwt = data.token;
      localStorage.setItem("jwt", jwt); // Store the token
      onAuthenticatedChanged(true, jwt);
    } catch (error) {
      setError(error.message || "Error logging in");
    }
  }

  return (
    <div className="d-flex flex-row align-items-center justify-content-center m-0 p-0 w-100 vh-100">
      <div className="bg-primary m-0 p-0 w-50 h-100 d-flex justify-content-center align-items-center">
        <img
          src="../public/logo-no-background.png"
          alt="Household Assistant Logo"
          className="w-50 h-auto"
        />
      </div>
      <form
        onSubmit={onLoginFormSubmitHAndler}
        className="needs-validation w-50 h-100 m-0 p-0 d-flex flex-column justify-content-center align-items-center"
        noValidate
      >
        <fieldset className="w-75 m-auto d-flex flex-column justify-content-center align-items-center">
          <legend className="text-primary">Authentication</legend>
          {loginMessage && loginMessageType === 'success' && (
            <div className="alert alert-success w-100 p-2 text-center" role="alert">
              {loginMessage}
            </div>
          )}
          {error && <div className="alert alert-danger w-100 p-2 text-center" role="alert">{error}</div>}
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
          <div className="w-100">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              required
            />
            <div className="invalid-feedback mt-3">
              Please enter your password.
            </div>
          </div>
          <a
            href="#"
            onClick={switchToRegister}
            className="text-success icon-link icon-link-hover text-sm align-self-start mt-0 mb-5 text-decoration-none"
            style={{ "--bs-link-hover-color-rgb": "6, 35, 5" }}
          >
            Don't have an account yet? Create one here.
          </a>
          <button type="submit" className="btn btn-primary w-25">
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
}
