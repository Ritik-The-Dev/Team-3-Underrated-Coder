import React from "react";
import { LuCalendarDays } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
const BlogCard = () => {
  const imgUrl = 'https://images.unsplash.com/photo-1716040313180-aa8df510ccfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D';
  return (
    <>
      <div className="w-full mt-3 relative h-[50vh] lg:h-[70vh] sm:h-[60vh] shadow rounded-xl overflow-hidden transition-all ease-in-out border border-green-600 hover:shadow-2xl">
        <img src= {imgUrl} alt="blog" className="w-full h-full absolute  object-cover z-0" />
        <div className=" absolute top-5 left-5">
            <div className="flex -ml-2 -mt-2 gap-1">
              <div className="badge cursor-pointer text-white bg-green-500 border-none">
                Technology
              </div>
              <div className="badge cursor-pointer text-white  bg-green-500 border-none">
                News
              </div>
            </div>
            <div className="-ml-2 -mb-4 cursor-pointer rounded text-green-500"></div>
        </div>
        <div className=" pb-5 pt-3 bg-transparent backdrop-blur-sm bottom-0 absolute">
          <div className=" flex justify-between p-1 pr-3">
            <div className=" flex items-end gap-1">
              <div className=" cursor-pointer avatar">
                <div className="w-12 border-2 border-green-600 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <h1 className="font-medium text-3xl text-white">Arun</h1>
            </div>
            <div className=" flex items-center gap-2">
              <LuCalendarDays className="text-white font-semibold text-xl" />
              <p className="text-white text-sm font-medium">12 Jan 2024</p>
            </div>
          </div>
          <div className=" px-2 -mt-1">
            <h1 className="text-green-400 text-xl font-medium line-clamp-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              sunt dolorum accusamus consequatur vero ipsam, nihil voluptate non
              doloribus assumenda.
            </h1>
            <p className=" text-sm text-white line-clamp-3 sm:line-clamp-4 lg:line-clamp-5 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quod
              sequi quis molestias ipsum sit placeat error cum laboriosam
              ducimus saepe soluta, vel impedit nemo a dolores aliquam similique
              eius libero, numquam optio sed minima. Tenetur.dolor sit amet consectetur adipisicing elit. Ipsa quod
              sequi quis molestias ipsum sit placeat error cum laboriosam
              ducimus saepe soluta, vel impedit nemo a dolores aliquam similique
              eius libero, numquam optio sed minima. Tenetur.
            </p>
            <span className=" mt-2 w-fit cursor-pointer flex items-center gap-1 text-sm bg-green-50 p-1 border-green-500 border hover:bg-green-500 hover:text-white transition-all ease-in-out duration-300 rounded-lg text-green-700 font-medium">
              <div>Read More</div>
              <FaLongArrowAltRight />
            </span>
          </div>
        </div> 
      </div>
    </>
  );
};

export default BlogCard;
