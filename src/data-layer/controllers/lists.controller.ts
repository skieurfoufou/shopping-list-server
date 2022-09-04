import { FilterQuery, ProjectionType } from "mongoose";
import listModel, { IList, listSchema } from "../models/lists.model";

async function read(filter: FilterQuery<IList>, proj?: ProjectionType<IList>) {
  return await listModel.find(filter, proj);
}

async function readOne(
  filter?: FilterQuery<IList>,
  proj?: ProjectionType<IList>
) {
  return await listModel.findOne(filter, proj);
}

async function findById(id: string) {
  const res = await listModel.findById(id);
  return res;
}
async function create(newList: IList) {
  return await listModel.create(newList);
}
async function update(id: string, list: IList) {
  return await listModel.findByIdAndUpdate(id, list);
}

async function remove(id: string) {
  return await listModel.findByIdAndDelete(id);
}

export default {
  read,
  readOne,
  findById,
  create,
  update,
  remove,
};
