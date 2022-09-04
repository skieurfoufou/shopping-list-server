import mongoose from "mongoose";
import env from "../utils/env";

export const connect = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);

    console.log("Mongodb is Connected!");
  } catch (err) {
    console.error("[ERROR] Mongodb: ", err);
    console.log("[ERROR] Mongoose: ", err);
  }
};
