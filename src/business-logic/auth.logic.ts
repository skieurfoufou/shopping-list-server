import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../utils/env";
import { getUserByEmail } from "./user.logic";
import BadRequestError from "../utils/errors/BadRequestError";

async function login(password: string, email: string) {
  const user = await getUserByEmail(email);
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    throw new BadRequestError("Invalid Credentials");
  }
  return createJwtToken({ email });
}

export function createJwtToken(user: { email: string }) {
  const accessToken = jwt.sign(
    {
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return accessToken;
}

export function isTokenValid(bearerToken: string | undefined) {
  if (!bearerToken) return false;
  // ? remove the 'Bearer '
  const jwtToken = bearerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(jwtToken, env.JWT_SECRET);
    if (
      //TODO: check that decoded is jwt.JwtPayload
      typeof decoded !== "string" &&
      decoded.exp &&
      Date.now() >= decoded.exp * 1000
    ) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { isTokenValid, login };
