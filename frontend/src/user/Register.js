import React, { useState } from "react";
import { register } from "../auth";
import { Link } from "react-router-dom";
import Navbar from "../core/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    error: "",
    success: "",
    redirectToReferrer: false,
  });

  const { email, password, repeatPassword, success, error } = formData;

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, error: false, [name]: event.target.value });
  };

  const showError = () => (
    <div className="error-message" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="success-message" style={{ display: success ? "" : "none" }}>
      Registration successfull, you can now <Link to="/login">login</Link>
    </div>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setFormData({ ...formData, error: "Passwords do not match!" });
      return;
    }

    register({ email, password }).then((res) => {
      if (res.success) {
        setFormData({ ...formData, success: "Registration complete!" });
      } else {
        if (res.error.split(",").length === 2)
          res.error = "Please add an valid email and password";
        setFormData({ ...formData, error: res.error });
      }
    });
  };

  const registerForm = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleChange("email")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={handleChange("password")}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={repeatPassword}
          placeholder="Repeat password"
          onChange={handleChange("repeatPassword")}
          className="form-control"
        />
      </div>
      <button onClick={onSubmit} className="submit-btn">
        Register
      </button>
    </form>
  );

  return (
    <div>
      <Navbar />
      {showError()}
      {showSuccess()}
      {registerForm()}
    </div>
  );
};

export default Register;
