import React, { useState } from "react";
import { SlCamera } from "react-icons/sl";
import Loading from "../components/Loding";
import { toast } from "react-toastify";

const Posts = () => {
  const [imgUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const slecetImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const blogSubmit = (e) => {
    e.preventDefault();
    if (!imgUrl) {
      setLoading(false);
      return toast.error("Select an image");
    }
    if (!title || !keywords || !description) {
      setLoading(false);
      return toast.error("All Fields are Required");
    }
    




    setTitle("");
    setDescription("");
    setKeywords("");
    setImageUrl('');
    setLoading(false);
  };

  return (
    <>
      <div className="w-[100vw] md:w-[80vw] h-[90vh] my-auto mx-auto flex flex-col lg:flex-row justify-center items-center">
        <div className=" w-[100%] lg:w-[70%] relative rounded-none h-[80%] skeleton">
        <input
                type="file"
                id="selectBlogImg"
                className=" hidden"
                accept="image/*"
                onChange={slecetImage}
              />
          

        
          {!imgUrl ? (
            <label
              htmlFor={!imgUrl?"selectBlogImg":''}
              className=" absolute cursor-cell lg:top-[45%] lg:left-[45%]  md:top-[50%] md:left-[50%] top-[42%] left-[45%]"
            >
              <SlCamera className=" hover:scale-[1.5] transition-all ease-out duration-200 text-green-600 text-[50px]" />
              <p className=" -ml-6 mt-1 text-green-600 select-none">
                Click to select
              </p>
            </label>
          ) : (<>
          <img src={imgUrl} className=" w-full h-full object-cover" alt="" />
            <label htmlFor="selectBlogImg"  className=" cursor-pointer transition-all ease-out duration-200 text-green-700 underline underline-offset-2 hover:bg-green-700 hover:text-white px-2 pb-2 rounded-lg font-medium mt-1" >Click to change image</label>
          </>
          )}
        </div>
        <div className="w-full lg:h-[80%] h-[100%] pt-12 pb-5 px-11 bg-green-200">
          <form onSubmit={blogSubmit}>
            <div className="form-group">
              <label htmlFor="titleInput" className="inputLabel">
                Title
              </label>
              <input
                className="inputField"
                type="text"
                id="titleInput"
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput" className="inputLabel">
                Decription
              </label>
              <textarea
                className="inputField"
                type="text"
                id="descriptionInput"
                name="name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="keywordsInput" className="inputLabel">
                Keywords (seperate by " , ")
              </label>
              <input
                className="inputField"
                type="text"
                id="keywordsInput"
                name="name"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button mb-2">
              Post
            </button>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Posts;
