import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userInfo from "../Recoil/userState";
import axios from "axios";
import { GET_USER_DETAILS } from "../Api";

const Home = () => {
  const [userData, setUserData] = useRecoilState(userInfo);
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(GET_USER_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setUserData(data.userdata);
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(!userData){
      getUserData();
    }
  },[userData])

  return (
    <div className="div-center">
      <h1 className="text-4xl font-bold">
        {userData
          ? `Welcome ${userData.name} to Team 3 Project`
          : "Login to Test"}
      </h1>
    </div>
  );
};

export default Home;
