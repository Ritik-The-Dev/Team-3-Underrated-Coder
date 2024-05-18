import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import axios from "axios";
import { GET_USER_DETAILS } from "../Api";
import { Audio } from "react-loader-spinner";

const Home = () => {
  const [userData, setUserData] = useRecoilState(userInfo);
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);

>>>>>>> 6544350a6e4782ebeafed8770bb3de92cae6fc05
  const getUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(GET_USER_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setLoading(false);
          setUserData(data.userdata);
        }
      } else {
        setLoading(false);
        return;
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, [userData]);

  return (
    <>
      <div className="div-center">
        <h1 className="text-4xl font-bold">
          {userData
            ? `Welcome ${userData.name} to Team 3 Project`
            : "Login to Test"}
        </h1>
      </div>
      {loading && (
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
      )}
    </>
  );
};

export default Home;
