import React, { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import { useRecoilState} from "recoil";
import userInfo from "../Recoil/userState";

const Navbar = () => {
  const [userData,setUserData] = useRecoilState(userInfo)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuCLick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = ()=>{
    setUserData(undefined)
    localStorage.removeItem('token')
  }

  return (
    <>
      <nav>
        <NavLink to={'/'}>
        <div className="logo">Team 3</div>
        </NavLink>

        <div>
          <div className="menuIcon">
            {menuOpen ? (
              <IoMdClose onClick={menuCLick} />
            ) : (
              <IoIosMenu onClick={menuCLick} />
            )}
          </div>
        </div>
      </nav>
      <div className={`nav-links ${menuOpen ? "open":''}`}>
        <ul>
          <NavLink to={'/'}    className={({isActive}) => ` ${isActive ? "active-link" : ""}`} ><li>Home</li></NavLink>
          <NavLink to={'/about'}   className={({isActive}) => ` ${isActive ? "active-link" : ""}`} ><li>About</li></NavLink>
          <NavLink to={'/contact'}   className={({isActive}) => ` ${isActive ? "active-link" : ""}`} ><li>Contact</li></NavLink>
        </ul>
        <div className="button-div">
         {
          userData ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
            <Link to={'/signup'}><button>Sign Up</button></Link>
            <Link to={'/login'}><button>Login</button></Link>
            </>
          ) 
         }
        </div>
      </div>
    </>
  );
};

export default Navbar;
