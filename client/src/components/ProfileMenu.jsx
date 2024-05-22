import React from 'react'
import {Link} from 'react-router-dom'

const ProfileMenu = ({Logout,userDetail}) => {

  return (
    <div className='border border-green-700 font-semibold bg-white shadow-xl p-3 text-center rounded-lg z-[11] fixed right-0 -mt-1 md:mr-3'>
       <div className=' text-green-600 underline underline-offset-2 select-none'><h2> {userDetail.name} </h2></div>
       <Link>
          <div className='cursor-pointer hover:scale-[1.1] hover:underline underline-offset-2 transition-all ease-in duration-100'><h2>Profile</h2></div>
       </Link>
       <Link>
          <div className='cursor-pointer hover:scale-[1.1] hover:underline underline-offset-2 transition-all ease-in duration-100'><h2>Setting</h2></div>
       </Link>
       <Link onClick={Logout}>
          <div className='text-red-500 hover:scale-[1.1] hover:underline underline-offset-2 transition-all ease-in duration-100 cursor-pointer'><h2>Logout</h2></div>
       </Link>
    </div>
  )
}

export default ProfileMenu
