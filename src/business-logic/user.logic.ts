import { isValidEmail } from "../utils/email";
import usersController from "../data-layer/controllers/users.controller";
import BadRequestError from "../utils/errors/BadRequestError";
import NotFoundError from "../utils/errors/NotFoundError";
import InternalServerError from "../utils/errors/InternalServerError";

const isUserExistWithEmail = async (email: string) => {
  try {
    const usersByEmailRes = await getUserByEmail(email);
    if (usersByEmailRes) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const getUserByEmail = async (email: string) => {
  if (!isValidEmail(email)) {
    throw new BadRequestError(`email is not valid email`);
  }

  const res = await usersController.readOne({ email });
  if (!res) {
    throw new NotFoundError(`no user found with email ${email}!`);
  }
  return res;
};

const createUserByEmail = async (user: { email: string; password: string }) => {
  const { email, password } = user;

  if (!isValidEmail(email)) {
    throw new BadRequestError(`email is not valid email`);
  }

  const isEmailTaken = await isUserExistWithEmail(email);
  if (isEmailTaken) {
    throw new BadRequestError(`email already exist`);
  }

  const res = await usersController.create({ email, password });
  if (!res) {
    throw new InternalServerError(`no user created with email ${email}!`);
  }
  return res;
};

module.exports = { getUserByEmail, createUserByEmail };
