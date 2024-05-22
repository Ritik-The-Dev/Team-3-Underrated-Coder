import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LOGIN } from "../Api";
import { useSetRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import Loding from "./Loding";

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
      <div className="h-screen flex justify-center items-center">
        <div className="p-10 lg:min-w-[30%] md:min-w-[50%] min-w-[90%] bg-white rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl mb-4">Login</h2>
            
            
          </div>
          <form onSubmit={formSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="emailInput" className="block text-gray-700 mb-2">
                Email or Mobile Number
              </label>
              <input
                className="inputField w-full p-2 border border-gray-300 rounded"
                type="email"
                id="emailInput"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
              <Link to={"/forget-password"} className="text-[#5cb85c]">
                Forget Password?
              </Link>
            </div>
            <button
              type="submit"
              className="submit-button w-full bg-blue-500 text-white py-2 rounded"
            >
              Login
            </button>
            <div className="flex items-center ">
              <div className="border-t border-1 border-[#5cb85c] flex-grow"></div>
              <div className="px-3 text-[#5cb85c] font-bold text-sm md:text-lg">OR</div>
              <div className="border-t border-1 border-[#5cb85c] flex-grow"></div>
            </div>
            <Link to={"/signup"}>
              <button className=" w-full text-[#5cb85c] outline text-sm md:text-xl outline-[#5cb85c] py-1 rounded hover:bg-[#5cb85c] hover:text-white transition-all ease-in duration-800">
                Create an account
              </button>
            </Link>
            <div class="flex items-center ">
              <div class="border-t border-1 border-[#5cb85c] flex-grow"></div>
              <div class="px-3 text-[#5cb85c] font-bold text-sm md:text-lg">OR</div>
              <div class="border-t border-1 border-[#5cb85c] flex-grow"></div>
            </div>
            <Link to={"/signup"}>
              <button className=" w-full text-[#5cb85c] outline text-sm md:text-xl outline-[#5cb85c] py-1 rounded hover:bg-[#5cb85c] hover:text-white transition-all ease-in duration-800">
                Create an account
              </button>
            </Link>
          </form>
        </div>
      </div>

      {loading && <Loding/>}

    </>
  );
};

export default Login;
