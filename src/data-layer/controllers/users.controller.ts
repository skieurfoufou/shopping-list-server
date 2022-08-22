import { FilterQuery, ProjectionType } from "mongoose";
import userModel, { IUser, userSchema } from "../models/users.model";

async function read(filter: FilterQuery<IUser>, proj?: ProjectionType<IUser>) {
  return await userModel.find(filter, proj);
}

async function readOne(
  filter?: FilterQuery<IUser>,
  proj?: ProjectionType<IUser>
) {
  return await userModel.findOne(filter, proj);
}

async function findById(id: string) {
  const res = await userModel.findById(id);
  return res;
}
async function create(newUser: IUser) {
  return await userModel.create(newUser);
}

export default {
  read,
  readOne,
  findById,
  create,
};
