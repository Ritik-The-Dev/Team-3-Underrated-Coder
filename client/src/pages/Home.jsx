import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import axios from "axios";
import { FETCH_BLOG, GET_USER_DETAILS } from "../Api";
import Loding from "../components/Loding";
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";

const Home = () => {
  const [userData, setUserData] = useRecoilState(userInfo);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(FETCH_BLOG);
      if (data.success) {
        setBlogData(data.Blogs);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  };

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
        localStorage.removeItem('token')
        setUserData(undefined)
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
    getBlogs();
    if (!userData) {
      getUserData();
    }
  }, [userData]);

  return (
    <>
      <div className=" lg:w-[60vw] md:w-[90vw] py-5 w-[97vw] mx-auto">
        {blogData.map((blogs, i) => (
          <div key={i} className="md:mt-8">
            <BlogCard blogs={blogs} />
          </div>
        ))}
      </div>

      {loading && <Loding />}
    </>
  );
};

export default Home;
