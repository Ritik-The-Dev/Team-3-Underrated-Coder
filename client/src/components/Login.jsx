import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LOGIN } from "../Api";
import { useSetRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import { IoMdCloseCircle } from "react-icons/io";
import { Audio } from "react-loader-spinner";

const Login = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        setLoading(false);
        return toast.error("All Fields are Required");
      }
      const { data } = await axios.post(LOGIN, { email, password });
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
      <div className="auth-container flex justify-center items-center bg-gray-100">
        <div className="p-10 lg:min-w-[30%] md:min-w-[50%] min-w-[90%] bg-white rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl mb-4">Login</h2>
            <IoMdCloseCircle
              onClick={() => navigate("/")}
              className="text-4xl cursor-pointer text-gray-400 hover:text-gray-500"
            />
          </div>
          <form onSubmit={formSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="emailInput" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                className="inputField w-full p-2 border border-gray-300 rounded"
                type="email"
                id="emailInput"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="passwordInput"
                className="block text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                className="inputField w-full p-2 border border-gray-300 rounded mb-2"
                type="password"
                id="passwordInput"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link to={"/forget-password"} className="text-blue-500">
                Forget Password?
              </Link>
            </div>
            <button
              type="submit"
              className="submit-button w-full bg-blue-500 text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
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

export default Login;
