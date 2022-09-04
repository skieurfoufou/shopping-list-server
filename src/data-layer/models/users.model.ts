import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
}

export const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, "full Name is required!"] },
  email: { type: String, required: [true, "email is required!"] },
  password: {
    type: String,
    required: [true, "password is required!"],
    min: [4, "password is too short"],
  },
});

export default mongoose.model("user", userSchema);
