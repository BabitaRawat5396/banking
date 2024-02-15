import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../service/operations/authAPI";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "Babita",
    lastName: "Rawat",
    phone: "9876543219",
    email: "sing@gmail.com",
    address: "67-B, Phase-2, Block",
    citizenship: "India",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    address,
  } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    dispatch(signUp(formData, navigate));
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      citizenship: "",
    });
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="form-container">
      <section className="w-[58%] h-[85%]">
        <h2>Bank Account Registration Form</h2>
        <form onSubmit={handleSubmit} className="form gap-8">
          {/* Personal Information */}
          <div>
            <h3 className="border-b-2">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* First Name */}
              <div className="field">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  placeholder="Enter here..."
                />
              </div>

              {/* Last Name */}
              <div className="field">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Enter here..."
                />
              </div>

              {/* Phone Number */}
              <div className="field">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleOnChange}
                  placeholder="Enter here..."
                />
              </div>

              {/* email */}
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter here..."
                />
              </div>

              <div className="field">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleOnChange}
                  placeholder="Enter here..."
                />
              </div>

              <div className="field">
                <label>Citizenship:</label>
                <select
                  name="citizenship"
                  onChange={handleOnChange}
                  className="border-2 rounded-lg px-2 outline-none"
                >
                  <option value="">Please Select</option>
                  <option value="US">US</option>
                  <option value="India">India</option>
                  <option value="EU">EU</option>
                </select>
              </div>
            </div>
          </div>

          {/* Set Password */}
          <div>
            <h3 className=" border-b-2 mb-4">Setting Password</h3>
            <div className="grid grid-cols-2 gap-20">
              {/* Account Type */}
              <div className="flex flex-col gap-2">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  className="border-2 rounded-lg"
                  value={password}
                  onChange={handleOnChange}
                />
              </div>
              {/* Currency Select */}
              <div className="flex flex-col gap-2">
                <label className="whitespace-nowrap">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="border-2 rounded-lg"
                  value={confirmPassword}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Register;
