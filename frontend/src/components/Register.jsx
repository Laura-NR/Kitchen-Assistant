import React, { useState } from "react";
import { registerUser } from "../API/UserManager";

export default function Register({ onRegistrationSuccess, switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      alert(data.message);
      onRegistrationSuccess();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center w-100 vh-100">
      <form
        onSubmit={handleSubmit}
        className="needs-validation h-100 w-50 d-flex flex-column justify-content-center align-items-center"
        noValidate
      >
        <fieldset className="w-75 m-auto d-flex flex-column justify-content-center align-items-center">
          <legend>Register</legend>
          <div className="mb-3 w-100">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
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
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback mt-3">
              Please enter a password.
            </div>
          </div>
          <a
            href="#"
            onClick={switchToLogin}
            className="text-success icon-link icon-link-hover text-sm align-self-start mt-0 mb-5 text-decoration-none"
            style={{
              "--bs-link-hover-color-rgb": "6, 35, 5",
              "--bs-link-hover-opacity": "1",
            }}
          >
            Already have an account? Login here.
          </a>
          <button type="submit" className="btn btn-primary w-25">
            Register
          </button>
        </fieldset>
      </form>
      <div className="bg-primary m-0 p-0 w-50 h-100 d-flex justify-content-center align-items-center">
        <img
          src="../public/logo-no-background.png"
          alt="Household Assistant Logo"
          className="w-50 h-auto"
        />
      </div>
    </div>
  );
}
