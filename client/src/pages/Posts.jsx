import React, { useState } from "react";
import { SlCamera } from "react-icons/sl";
import Loading from "../components/Loding";
import { toast } from "react-toastify";
import axios from "axios";
import { ADD_BLOG, IMAGE_UPLOAD } from "../Api";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const [imgUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const slecetImage = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const blogSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!imgUrl) {
      setLoading(false);
      return toast.error("Select an image");
    }
    if (!title || !keywords || !description) {
      setLoading(false);
      return toast.error("All Fields are Required");
    }
    try {
      console.log({img:imgUrl})
      const formData = new FormData();
      formData.append("image", imgUrl);
      const { data: uploadData } = await axios.post(IMAGE_UPLOAD, formData);
      if (uploadData.success) {
        const array = keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter((keyword) => keyword);
        const link = uploadData.fileUrl;
        const { data: blogData } = await axios.post(ADD_BLOG, {
          title,
          content: description,
          blogImg: link,
          views: 1,
          likes: 1,
          keywords: array,
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        if (blogData.success) {
          toast.success(blogData.msg);
          navigate('/')
          setTitle("");
          setDescription("");
          setKeywords("");
          setImageUrl("");
          setLoading(false);
        } else {
          toast.error(blogData.message);
        }
      } else {
        toast.error("Image Upload Failed");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setLoading(false);
    }
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
              htmlFor={!imgUrl ? "selectBlogImg" : ""}
              className=" absolute cursor-cell lg:top-[45%] lg:left-[45%]  md:top-[50%] md:left-[50%] top-[42%] left-[45%]"
            >
              <SlCamera className=" hover:scale-[1.5] transition-all ease-out duration-200 text-green-600 text-[50px]" />
              <p className=" -ml-6 mt-1 text-green-600 select-none">
                Click to select
              </p>
            </label>
          ) : (
            <>
              <img
                src={typeof imgUrl!== "string" ? URL.createObjectURL(imgUrl) : imgUrl}
                className=" w-full h-full object-cover"
                alt=""
              />
              <label
                htmlFor="selectBlogImg"
                className=" cursor-pointer transition-all ease-out duration-200 text-green-700 underline underline-offset-2 hover:bg-green-700 hover:text-white px-2 pb-2 rounded-lg font-medium mt-1"
              >
                Click to change image
              </label>
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
