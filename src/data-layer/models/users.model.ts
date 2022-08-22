import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "email is required!"] },
  password: {
    type: String,
    required: [true, "password is required!"],
    min: [4, "password is too short"],
  },
});

export default mongoose.model("user", userSchema);
