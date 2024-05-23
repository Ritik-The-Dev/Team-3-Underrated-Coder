import BlogSchema from "../models/blogs.js";

// Function to add a new blog
export const addBlog = async (req, res) => {
  try {
    const author = req.user.name;
    const authorImg = req.user.photo;

    const { title, content, blogImg, views, likes, keywords } = req.body;

    // Check if all required fields are present
    if (
      !author ||
      !title ||
      !content ||
      !authorImg ||
      !blogImg ||
      views === undefined ||
      likes === undefined ||
      !keywords
    ) {
      return res.status(400).json({ msg: "All fields are necessary" });
    }

    // Create a new blog entry
    await BlogSchema.create({
      author,
      title,
      content,
      authorImg,
      blogImg,
      views,
      likes,
      keywords,
    });

    return res.status(201).json({success:true, msg: "Blog added successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Function to fetch all blogs
export const FetchAllBlog = async (req, res) => {
  try {
    const data = await BlogSchema.find();
    return res.status(200).json({
      success: true,
      msg: "Blogs fetched successfully",
      Blogs: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};