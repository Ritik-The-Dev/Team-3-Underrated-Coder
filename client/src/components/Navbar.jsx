import React, { useEffect, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useRecoilState } from "recoil";
import userInfo from "../Recoil/userState";
import { toast } from "react-toastify";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [userData, setUserData] = useRecoilState(userInfo);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isdetailOpen, setIsdetailOpen] = useState(false);
  const navigate = useNavigate();

  const menuCLick = () => {
    setMenuOpen(!menuOpen);
    setIsdetailOpen(false);
  };

  const avatarClick = () => {
    setIsdetailOpen(!isdetailOpen);
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setUserData(undefined);
    localStorage.removeItem("token");
    navigate("/login");
    return toast.success("Logout Successfully");
  };

  useEffect(()=>{
    if(userData){
      setImgUrl(userData.photo)
    }
  },[])
  return (
    <div className="bg-white rounded-lg sticky top-0 z-50 shadow-md">
      <nav>
        <NavLink to={"/"}>
          <div className="flex items-end">
            <span className="text-green-500 text-2xl">B</span>
            <span>log</span>
            <span className=" text-green-500 text-2xl">...</span>
            <GoPencil className=" mb-1 text-xl text-green-900 -mt-5" /> 
          </div>
        </NavLink>

        <div>
          <div className="menuIcon text-2xl">
            {menuOpen ? (
              <IoMdClose className="text-red-800" onClick={menuCLick} />
            ) : (
              <IoIosMenu className=" text-green-800" onClick={menuCLick} />
            )}
          </div>
        </div>
      </nav>
      <div
        className={`nav-links bg-white md:border-none md:bg-transparent  rounded-lg border  border-green-600 ${
          menuOpen ? "open" : ""
        }`}
      >
        <ul className=" -mt-1">
          <NavLink
            to={"/"}
            className={({ isActive }) => ` ${isActive ? "active-link" : ""}`}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to={"/post"}
            className={({ isActive }) => ` ${isActive ? "active-link" : ""}`}
          >
            <li>Post</li>
          </NavLink>
        </ul>
        <div onClick={avatarClick} className="cursor-pointer pt-1  p-3">
          <div className=" flex justify-center items-center h-[40px] w-[40px] overflow-hidden shadow-md rounded-full">
            {imgUrl ? (
              <img src={imgUrl} width={50} alt="profile" className=" object-cover" />
            ) : (
              <RxAvatar className="text-green-700 text-3xl" />
            )}
          </div>
        </div>
      </div>
      {isdetailOpen && userData ? (
        <ProfileMenu Logout={handleLogout} userDetail={userData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
