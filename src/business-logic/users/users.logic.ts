import { isValidEmail } from "../../utils/email";
import usersController from "../../data-layer/controllers/users.controller";
import BadRequestError from "../../utils/errors/BadRequestError";
import NotFoundError from "../../utils/errors/NotFoundError";
import InternalServerError from "../../utils/errors/InternalServerError";
const { isValidObjectId } = require("mongoose");
import { IUser } from "../../data-layer/models/users.model";

export const getAllUsers = async () => {
  let filter = {};

  const allUsers = await usersController.read(filter);
  if (allUsers.length === 0) {
    throw new NotFoundError("no user found!");
  }
  return allUsers;
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

export const getUserById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError(`id is not valid ObjectId`);
  }
  const res = await usersController.findById(id);
  if (!res) {
    throw new NotFoundError(`no user found with id ${id}!`);
  }
  return res;
};

export const createUserByEmail = async (user: IUser) => {
  const { fullName, email, password } = user;

  if (!isValidEmail(email)) {
    throw new BadRequestError(`email is not valid email`);
  }

  const isEmailTaken = await isUserExistWithEmail(email);
  if (isEmailTaken) {
    throw new BadRequestError(`email already exist`);
  }
  // TODO: hash the password
  const res = await usersController.create({ fullName, email, password });
  if (!res) {
    throw new InternalServerError(`no user created with email ${email}!`);
  }
  return res;
};

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
