import React, { useEffect, useState } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'


function Layout() {
  const [isLogIn,setIsLogIn] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const pathLocation = location.pathname;
  
  const preventLogin = (pathLocation === '/login') || (pathLocation === '/signup') || (pathLocation === '/forget-password');

  useEffect(()=>{
    if (token && preventLogin) {
      navigate('');
    }
  },[pathLocation])


  useEffect(()=>{
    setIsLogIn(false);
    if (!token){ 
      return navigate('/login');
    }else{
      setIsLogIn(true);
    }
  
  },[token])

  return (
    <>
    {
      isLogIn?<Navbar/>:''
    }
    <Outlet />
    </>
  )
}

export default Layout