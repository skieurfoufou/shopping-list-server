import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const env = () => {
  const { JWT_SECRET, PORT, MONGO_URL } = process.env;

  if (typeof JWT_SECRET !== "string" && !JWT_SECRET)
    throw new Error("JWT_SECRET is not valid");

  if (typeof PORT !== "string" && !PORT) throw new Error("PORT is not valid");

  if (typeof MONGO_URL !== "string" && !MONGO_URL)
    throw new Error("MONGO_URL is not valid");

  return {
    PORT: PORT,
    MONGO_URL: MONGO_URL,
    JWT_SECRET: JWT_SECRET,
  };
};

export default env();
