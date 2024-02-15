import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/operations/authAPI";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Event handler to update formData state when input values change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as sending data to a backend server
    dispatch(login(formData, navigate));
  };

  return (
    <main className="form-container">
      <section className="w-[40%] h-[70%]">
        <h2>Login Form</h2>
        <form className="form gap-2" onSubmit={handleSubmit}>
          <div className="field">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className="field">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          New here?{" "}
          <Link to="/register" className="text-[#e3a8a8] mt-4">
            Register?
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
