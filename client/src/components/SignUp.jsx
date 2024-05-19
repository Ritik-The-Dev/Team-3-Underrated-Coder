import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEND_SIGNUP_OTP, SIGNUP } from "../Api";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import { toast } from "react-toastify";

import Loading from './Loding'

const SignUp = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  
  const mail = email.split('@')[1];
  

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email || !password || !name) {
        setLoading(false);
        return toast.error("All Fields are Required");
      }
      if (name.length < 3) {
        setLoading(false);
        setName('');
        return toast.error("Name must be minimum 3 letters");
      }
      if (mail !== 'gmail.com') {
        setLoading(false);
        setEmail('');
        return toast.error("Provide only Google Mail Id");
      }
      if (password.length < 5) {
        setLoading(false);
        setPassword('');
        setConfirmPassword('');
        return toast.error("Password must be minimum 5 characters");
      }
      if (password !== confirmPassword) {
        setLoading(false);
        setPassword('');
        setconfirmPassword('');
        return toast.error("Both Passwords must be same");
      }
      const { data } = await axios.post(SEND_SIGNUP_OTP, { email });
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
      const { data } = await axios.post(SIGNUP, { name, email, password, otp });
      if (data.success) {
        toast.success(data.message);
        const user = data.result;
        setUserInfo(user);
        localStorage.setItem("token", data.token);
        navigate("/");
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
      <div className="h-screen flex justify-center items-center">
        <div className="p-10 lg:min-w-[30%] md:min-w-[50%] min-w-[90%] bg-white rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl mb-4">Sign Up</h2>
          
          </div>
          <br />
          <form onSubmit={formSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="inputLabel">
                Name
              </label>
              <input
                className="inputField"
                type="text"
                id="nameInput"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
          
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="inputLabel">
                Email
              </label>
              <input
                className="inputField"
                type="email"
                id="emailInput"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput" className="inputLabel">
                Password
              </label>
              <input
                className="inputField"
                type="password"
                id="passwordInput"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPasswordInput" className="inputLabel">
                Confirm Password
              </label>
              <input
                className="inputField"
                type="password"
                id="confirmPasswordInput"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

              />
            </div>
            <button type="submit" className="submit-button">
              Sign Up
            </button>
            <div class="flex items-center ">
              <div class="border-t border-1 border-[#5cb85c] flex-grow"></div>
              <div class="px-3 text-[#5cb85c] font-bold text-sm md:text-lg">OR</div>
              <div class="border-t border-1 border-[#5cb85c] flex-grow"></div>
            </div>
            <Link to={"/login"}>
              <button className=" w-full text-[#5cb85c] outline text-sm md:text-lg outline-[#5cb85c] py-1 rounded hover:bg-[#5cb85c] hover:text-white transition-all ease-in duration-800">
                I have already an account
              </button>
            </Link>
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

      {loading && <Loading/>}

    </>
  );
};

export default SignUp;
