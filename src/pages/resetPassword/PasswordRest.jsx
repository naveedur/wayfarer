import React from 'react';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { domain } from "../../domain.js";

export const PasswordRest = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const actualData = {
      email: "rajass@gmail.com",
      otpCode: data.get("otpCode"),
      password: data.get("password"),
      rePassword: data.get("rePassword"),
    };

    if (actualData.password === actualData.rePassword) {
      try {
        const response = await axios.post('${domain}/api/reset-password', actualData);
        const { type, message } = response.data;
        if (type === "error") {
          toast.error(message);
        } else {
          toast.success("Password reset");
          navigate('/login'); // Redirect to login page on success
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="account row">
      <div className="form col-md-5 col-10">
        <h3 className="heading mb-5">Enter Your Mail</h3>
        <form method="post" onSubmit={handleSubmit}>
          <div className="inputField">
            <input required type="text" name="otpCode" id="otpCode" placeholder="Enter OTP that was sent to your email" />
          </div>
          <div className="inputField">
            <input type="password" name="password" id="password" placeholder="Password" />
          </div>
          <div className="inputField">
            <input type="password" name="rePassword" id="rePassword" placeholder="Confirm Password" />
          </div>
          <div className="inputField">
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};
