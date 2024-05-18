import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEND_SIGNUP_OTP, SIGNUP } from "../Api";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import { Audio } from "react-loader-spinner";

const SignUp = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email || !password || !name) {
        setLoading(false);
        return toast.error("All Fields are Required");
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
      <div className="auth-container">
        <div className="auth p-10 lg:min-w-[30%] rounded-lg md:min-w-[50%] min-w-[90%]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl mb-4">Sign Up</h2>
            <IoMdCloseCircle
              onClick={() => navigate("/")}
              className="text-4xl cursor-pointer text-gray-400 hover:text-gray-500"
            />
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
                required
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
                required
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
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {otpSent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl mb-4">Confirm otp</h2>
              <IoMdCloseCircle
                onClick={() => setOtpSent(false)}
                className="text-3xl text-gray-400 cursor-pointer hover:text-gray-500"
              />
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
                  required
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-transparent flex items-center justify-center rounded shadow-md w-full max-w-md">
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
      )}
    </>
  );
};

export default SignUp;
