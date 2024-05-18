import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FORGET_PASS, SEND_FORGET_OTP } from "../Api";
import axios from 'axios'
import { toast } from "react-toastify";
import Loading from "./Loding";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) {
        setLoading(false);
        return toast.error("Email is Required");
      }
      const { data } = await axios.post(SEND_FORGET_OTP, { email });
      if (data.success) {
        toast.success(data.message);
        setOtpSent(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.data?.message || error.message
      );
      setLoading(false);
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!otp) {
        setLoading(false);
        return toast.error("OTP is Required");
      }
      if (password.length < 5) {
        setLoading(false);
        setPassword('');
        setConfirmPassword('');
        return toast.error("Password must be minimum 5 characters");
      }
      if(confirmpassword !== password ){
        setLoading(false);
        return toast.error("Both Password do not Match");
      }
      const { data } = await axios.post(FORGET_PASS, {
        email,
        otp,
        newpassword: password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.data?.message || error.message
      );
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="p-10 lg:min-w-[30%] md:min-w-[50%] min-w-[90%] bg-white rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl mb-4">Password Recovery</h2>
        
          </div>
          <form onSubmit={formSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="inputLabel">
                Email
              </label>
              <input
                className="inputField"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
  
              />
            </div>
            <button type="submit" className="submit-button">
              Send Otp
            </button>
          </form>
        </div>
      </div>
      {otpSent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl mb-4">Confirm otp</h2>
        
            </div>
            <form onSubmit={otpSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="otpInput" className="block text-gray-700 mb-2">
                  OTP
                </label>
                <input
                  className="inputField w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="otpInput"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
  
                />
                <label
                  htmlFor="passwordInput"
                  className="block text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  className="inputField w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="passwordInput"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
  
                />
                <label
                  htmlFor="confirmPass"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  className="inputField w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="confirmPass"
                  name="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="submit-button w-full bg-blue-500 text-white py-2 rounded"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
      {loading && (
<<<<<<< HEAD
        <Loading/>
=======
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-transparent flex items-center justify-center">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        </div>
>>>>>>> 6544350a6e4782ebeafed8770bb3de92cae6fc05
      )}
    </>
  );
};

export default Login;
