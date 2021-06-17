import React, { useState, useContext } from "react";
import { login } from "../auth";
import { Redirect } from "react-router-dom";
import Navbar from "../core/Navbar";
import { AuthContext } from "../context/Auth";

const Login = () => {
  const { isAuthenticated, authenticate } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const { email, password, error, redirectToReferrer } = formData;

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).then((res) => {
      if (res && res.success) {
        authenticate(res.token);
        setFormData({ ...formData, redirectToReferrer: true });
      } else if (res && res.error) {
        setFormData({ ...formData, error: res.error });
      } else {
        setFormData({ ...formData, error: "Server Error" });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) return <Redirect to="/" />;
  };

  const showError = () => (
    <div className="error-message" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const loginForm = () => (
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
      <button onClick={onSubmit} className="submit-btn">
        Login
      </button>
    </form>
  );
  return !isAuthenticated() ? (
    <div>
      <Navbar />
      {showError()}
      {loginForm()}
      {redirectUser()}
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
