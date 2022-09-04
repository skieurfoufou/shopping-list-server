import mongoose from "mongoose";
import IUser from "./users.model";

export interface IList {
  title: string;
  items: { value: string; isDone: boolean }[];
}

export const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required!"],
  },
  items: [
    {
      value: String,
      isDone: Boolean,
    },
  ],
  owners: [{ fullName: String, email: String, password: String }],
});

export default mongoose.model("list", listSchema);
