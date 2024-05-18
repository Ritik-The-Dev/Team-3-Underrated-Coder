import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log(`MongoDB Connected...`))
    .catch((err)=> console.log(err))
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
