import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import axios from "axios";
import { GET_USER_DETAILS } from "../Api";
import Loding from '../components/Loding';
import BlogCard from '../components/BlogCard';
import { Audio } from "react-loader-spinner";
import { toast } from "react-toastify";

const Home = () => {
  const [userData, setUserData] = useRecoilState(userInfo);
  const [loading, setLoading] = useState(false);
  const numbers = [1, 2, 3, 4, 5,1, 2, 3, 4, 5];



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
      if (
        err?.response?.data?.message ||
        err?.data?.message ||
        err.message === "Invalid or expired token"
      ) {
        localStorage.removeItem("token");
        toast.error("Your Session have been Expired Pls Login Again");
      }
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
    <div className=' lg:w-[70vw] md:w-[90vw] py-5 w-[97vw] mx-auto'>
      {
        numbers.map((number,i) =>
          <div key={i}>
            <BlogCard/>
          </div>
        )
      }
    </div>
      
      {loading && (
        <Loding/>
      )}
    </>
  );
};

export default Home;
