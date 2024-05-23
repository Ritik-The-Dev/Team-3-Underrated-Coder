import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  number: { type: String, unique: true, required: true },
  photo: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
